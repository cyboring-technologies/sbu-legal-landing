import os

def fix_json(filepath, limit, ending):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    clean_lines = lines[:limit]
    new_content = "".join(clean_lines).rstrip() + "\n" + ending
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

es_ending = """      "contact": {
        "title": "14. Contáctenos",
        "content": "Si tiene alguna pregunta sobre estos Términos, contáctenos en:",
        "email": "Correo electrónico"
      }
    }
  }
}
"""

en_ending = """      "contact": {
        "title": "14. Contact Us",
        "content": "If you have any questions about these Terms, please contact us at:",
        "email": "Email"
      }
    }
  }
}
"""

fix_json('src/messages/es.json', 1038, es_ending)
fix_json('src/messages/en.json', 1085, en_ending)
print("Files fixed successfully.")
