<?php

    class Database
    {
        /**
         * Returns the PDO instance to represent a connection to the requested database.
         * If none exists, generate a new connection using the database-credentials given in the Settings class.
         *
         * @return  PDO     The PDO database connection.
         */
        public static function connection()
        {
            # First check if a connection doesn't exist yet:

            if (empty($GLOBALS['__db_connection'])) {
                $pdo_dsn = 'mysql:host=' . Settings::HOST . ';dbname=' . Settings::DB_NAME . ';charset=utf8';
                $pdo_options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];

                $GLOBALS['__db_connection'] = new PDO($pdo_dsn, Settings::USERNAME, Settings::PASSWORD, $pdo_options);
            }

            return $GLOBALS['__db_connection'];
        }


        /**
         * Returns the ID of the last inserted row generated by a query.
         * Uses the database connection to acquire the value.
         *
         * @return  int         The ID as an integer value of the last inserted row.
         */
        public static function inserted_id()
        {
            return Database::connection()->lastInsertId;
        }


        /**
         * Executes query onto database. Prepares query using PDOs parameter-preparing.
         * Supports all types of queries, automatically returns values when given a SELECT query.
         *
         * @param   string              The query to be executed
         * @param   array               Parameters for the query, used against SQL Injection
         * @param   bool                Define if the query force-returns an array on a SELECT query
         * @return  array|bool|null     Query result, returns an bool when only executed the query, returns an array when SELECTing data and return null on error
         */
        public static function query($_query, $_parameters = [], $_force_array = false)
        {
            if (!empty($_query)) {
                try {
                    $pdo_statement = Database::connection()->prepare($_query);
                    $query_success = $pdo_statement->execute($_parameters);
                }
                catch( PDOException $Exception ) {
                    if(Settings::DEBUG) echo "<pre>Database Error-Info:\n" . $Exception->getMessage() . "</pre>";
                    return null;
                }

                $fetched_data = $pdo_statement->fetchAll();

                if(strtoupper(substr($_query, 0, 6)) === "SELECT") {
                    if(count($fetched_data) == 1 && $_force_array == false) return $fetched_data[0];
                    return $fetched_data;
                } else {
                    return $query_success;
                }
            }
            return null;
        }
    }