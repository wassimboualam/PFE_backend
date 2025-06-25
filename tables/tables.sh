for file in $(ls Tables/*.sql)
do
    echo "Found file: $file"
    if [[ $file = *.sql ]]
    then
        bash mysql_exec_file.sh $file
    fi
done