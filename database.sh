#!/bin/sh

choice=10
echo "\n\n\n\n\n"
while [ $choice != 0 ]
do
  echo "========= Menu ========="
  echo "[1] - Drop Database"
  echo "[2] - Initialize (Sectors, Fiestas, CMS, Admin)"
  echo "[3] - Add all Fiesta"
  echo "[4] - Admin"
  echo "[5] - Fix **"
  echo "[0] - Exit"
  echo "========================"
  echo "Enter choice: "
  read choice

  case "$choice" in
    "1")
        mongo localhost:27017/fiesta_db _mongodb/drop.js
        echo "\n\n\n\n\n\n\n"
        echo "Database has been dropped."
    ;;

    "2")
        mongo localhost:27017/fiesta_db _mongodb/_init.js
        echo "\n\n\n\n\n\n\n"
        echo "Database has been initialized."
    ;;

    "3")
        mongo localhost:27017/fiesta_db _mongodb/all_fiesta.js
        echo "\n\n\n\n\n\n\n"
        echo "All fiestas stored in _mondodb/fiestas are added in the database."
    ;;

    "4")
        mongo localhost:27017/fiesta_db _mongodb/admin.js
        echo "\n\n\n\n\n\n\n"
        echo "Admin was initialized."
    ;;

    "5")
        mongo localhost:27017/fiesta_db _mongodb/fix.js
        echo "\n\n\n\n\n\n\n"
        echo "Fix has been made."
    ;;

    *) echo "\n\n\n\n\n\n\n"
    ;;
  esac

done
