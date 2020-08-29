# My Discord Bot

## Features

### 1. Moderating

-   Kick
-   Ban
-   Changeprefix (Work in progress)

### 2. Music

-   Join
-   Leave
-   Play
-   Skip

Used [Node.js](https://github.com/nodejs/node) ([discord.js](https://github.com/discordjs/discord.js), [dotenv](https://github.com/motdotla/dotenv), [erela.js](https://github.com/Solaris9/erela.js), [mysql2](https://github.com/sidorares/node-mysql2)) and [Lavalink](https://github.com/Frederikam/Lavalink). Also uses [Mysql](https://github.com/mysql/mysql-server) database for prefixes.

To use this you must have **.env** file with this parameters:

        BOT_TOKEN   - for discord bot login
        HOST        - for lavalink login
        PORT        - for lavalink login
        PASSWORD    - for lavalink login
        DB_USER     - for database login
        DB_PASS     - for database login
        DB_NAME     - for database login
