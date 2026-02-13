import os

def update_note(filepath, old_note, new_note):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated_content = content.replace(old_note, new_note)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

es_old = "Canal exclusivo para requerimientos institucionales o de volumen. No brinda soporte operativo ni asistencia durante la ejecución."
es_new = "Canal externo para ventas y requerimientos enterprise. No brinda soporte operativo ni asistencia durante la ejecución."

en_old = "Exclusive channel for institutional or volume requirements. Does not provide operational support or assistance during execution."
en_new = "External channel for sales and enterprise requirements. Does not provide operational support or assistance during execution."

update_note('src/messages/es.json', es_old, es_new)
update_note('src/messages/en.json', en_old, en_new)
print("Notes updated successfully.")
