#!/bin/bash

# Vai nella cartella in cui si trova lo script
cd "$(dirname "$0")" || exit 1

# Chiedi il messaggio del commit
read -r -p 'Premi INVIO per usare "COMMIT" oppure scrivi il messaggio: ' MESSAGGIO

# Se non scrivi nulla, usa COMMIT
MESSAGGIO=${MESSAGGIO:-COMMIT}

# Esegui commit e push
git add -A
git commit -m "$MESSAGGIO" || exit 1
git push || exit 1

echo "Operazione completata!"