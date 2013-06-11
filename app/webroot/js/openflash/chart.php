<html>
<head>
</head>
<body>
    <form action="chart.php">
        <?php
        include_once 'ofc-library/open_flash_chart_object.php';
        open_flash_chart_object( 500, 250, 'http://'. $_SERVER['SERVER_NAME'] .'/open-flash-chart/data-files/'.$_GET['data'], false );
        ?>
        <br><br>
        <input type="text" name="data" value='<? echo $_GET['data'] ?>'>
        <input type="submit" value="Enviar">
        <br><br>
        <iframe style="width:500px;height:250px" src="<? echo 'http://'. $_SERVER['SERVER_NAME'] .'/open-flash-chart/data-files/'.$_GET['data'] ?>">
        
    </form>
</body>
</html>