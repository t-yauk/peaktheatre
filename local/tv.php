<?php $root_url = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME']; ?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TV | Peak Theatre</title>
    <link rel="stylesheet" href="../global/tv.css">
    <link rel="stylesheet" href="../global/style.css">
    <script src="https://kit.fontawesome.com/71793c3a09.js" crossorigin="anonymous"></script>
</head>
<body id="tv">

    <header class="header">
        <div class="logo">
            <img src="http://192.168.2.165/img/tv-logo.png">
        </div>
        <nav class="main-menu">
            <a href="/" class="main-menu-item" style="width:calc(100% - 30px);"><i class="fa-solid fa-film"></i>&emsp;Movies</a>
            <button class="main-menu-item return"><i class="fa-solid fa-chevron-left"></i> All Shows</a>
        </nav>
    </header>

    <main class="main-wrapper">
        <section class="library-wrapper active"></section>
        <section class="show-wrapper">
            <div class="show-details">
                <img id="show-thumbnail">
                <div class="details">
                    <img id="show-logo">
                    <p id="description"></p>
                    <div class="season-wrapper"></div>
                </div>
            </div>
            <div class="episode-wrapper">
                <div class="episode-container"></div>
            </div>
        </section>
    </main>

    <section class="loading">
        <span class="loading-icon">
            <i class="fa-solid fa-circle-notch"></i>
        </span>
    </section>
    
    
    <script type="module" src="../global/tv.js"></script>
</body>
</html>
