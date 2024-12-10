{
  "public": {
    "Tables": {
      "users": {
        "Row": {
          "id": "string",
          "email": "string",
          "name": "string",
          "phone": "string | null",
          "address": "string | null",
          "avatar_url": "string | null",
          "role": "'USER' | 'ADMIN' | 'ONG'",
          "created_at": "string",
          "updated_at": "string"
        },
        "Insert": {
          "id": "string",
          "email": "string",
          "name": "string",
          "phone": "string | null",
          "address": "string | null",
          "avatar_url": "string | null",
          "role": "'USER' | 'ADMIN' | 'ONG'",
          "created_at": "string | null",
          "updated_at": "string | null"
        },
        "Update": {
          "id": "string | null",
          "email": "string | null",
          "name": "string | null",
          "phone": "string | null",
          "address": "string | null",
          "avatar_url": "string | null",
          "role": "'USER' | 'ADMIN' | 'ONG' | null",
          "updated_at": "string | null"
        }
      },
      "reports": {
        "Row": {
          "id": "string",
          "type": "'abuse' | 'abandonment' | 'injury' | 'other'",
          "description": "string",
          "location": {
            "lat": "number",
            "lng": "number",
            "address": "string"
          },
          "images": "string[]",
          "status": "'pending' | 'in_progress' | 'resolved' | 'cancelled'",
          "reporter_id": "string | null",
          "anonymous": "boolean",
          "contact_info": {
            "name": "string | null",
            "phone": "string | null",
            "email": "string | null"
          },
          "created_at": "string",
          "updated_at": "string"
        },
        "Insert": {
          "id": "string | null",
          "type": "'abuse' | 'abandonment' | 'injury' | 'other'",
          "description": "string",
          "location": {
            "lat": "number",
            "lng": "number",
            "address": "string"
          },
          "images": "string[] | null",
          "status": "'pending' | 'in_progress' | 'resolved' | 'cancelled' | null",
          "reporter_id": "string | null",
          "anonymous": "boolean",
          "contact_info": {
            "name": "string | null",
            "phone": "string | null",
            "email": "string | null"
          },
          "created_at": "string | null",
          "updated_at": "string | null"
        },
        "Update": {
          "type": "'abuse' | 'abandonment' | 'injury' | 'other' | null",
          "description": "string | null",
          "location": {
            "lat": "number",
            "lng": "number",
            "address": "string"
          } | null,
          "images": "string[] | null",
          "status": "'pending' | 'in_progress' | 'resolved' | 'cancelled' | null",
          "contact_info": {
            "name": "string | null",
            "phone": "string | null",
            "email": "string | null"
          } | null,
          "updated_at": "string | null"
        }
      }
    }
  }
}