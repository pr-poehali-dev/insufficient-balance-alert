"""
Бэкенд для управления заказами шиномонтажа
Функции: создание заказа, получение списка заказов, обновление статуса
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            status_filter = event.get('queryStringParameters', {}).get('status') if event.get('queryStringParameters') else None
            
            if status_filter:
                cur.execute(
                    "SELECT * FROM orders WHERE status = %s ORDER BY booking_date DESC, booking_time DESC",
                    (status_filter,)
                )
            else:
                cur.execute("SELECT * FROM orders ORDER BY booking_date DESC, booking_time DESC LIMIT 100")
            
            orders = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(order) for order in orders], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute(
                """
                INSERT INTO orders (
                    client_name, client_phone, client_email, location, 
                    car_type, service, service_duration, service_price, 
                    booking_date, booking_time, status
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    body_data['clientName'],
                    body_data['clientPhone'],
                    body_data.get('clientEmail', ''),
                    body_data['location'],
                    body_data['carType'],
                    body_data['service'],
                    body_data['serviceDuration'],
                    body_data['servicePrice'],
                    body_data['bookingDate'],
                    body_data['bookingTime'],
                    'pending'
                )
            )
            
            order = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(order), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            order_id = body_data.get('id')
            
            if not order_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Order ID is required'}),
                    'isBase64Encoded': False
                }
            
            update_fields = []
            params = []
            
            if 'status' in body_data:
                update_fields.append('status = %s')
                params.append(body_data['status'])
            
            if 'notes' in body_data:
                update_fields.append('notes = %s')
                params.append(body_data['notes'])
            
            if update_fields:
                update_fields.append('updated_at = CURRENT_TIMESTAMP')
                params.append(order_id)
                
                query = f"UPDATE orders SET {', '.join(update_fields)} WHERE id = %s RETURNING *"
                cur.execute(query, params)
                
                order = cur.fetchone()
                conn.commit()
                
                if order:
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(dict(order), default=str),
                        'isBase64Encoded': False
                    }
            
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Order not found'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
