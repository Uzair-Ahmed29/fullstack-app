<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="https://img.icons8.com/bubbles/452/monitor.png" type="image/gif" sizes="16x16">

        <title>Laravel + React</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
        <!-- Styles -->
        
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script src="{{ asset('/js/app.js') }}"></script>
</html>
