<html>
<head>
</head>
<body>
    <form action="chart.php">
        <?php
        include_once 'ofc-library/open_flash_chart_object.php';
        open_flash_chart_object( 500, 250, 'http://'. $_SERVER['SERVER_NAME'] .'/open-flash-chart/dados.php', false );
        ?>
    </form>
</body>
</html>