until node almalexia.js; do
    echo "Almalexia crashed with exit code $?.  Respawning.." >&2
    sleep 1
done

###/usr/local/mysql-8.0.17-macos10.14-x86_64/bin/mysql  -u root  -p
# CREATE DATABASE foxbot;
# mysql -u root -p foxbot < mysql_schema.sql
