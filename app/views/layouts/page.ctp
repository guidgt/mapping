<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">		
        <!--title>Build in Cake 1.2</title-->
        <title>MPS-eXtreme</title>

        <link rel="stylesheet" href="<?php echo $this->webroot; ?>css/plano.css" type="text/css" />
        <script type="text/javascript" src="<?php echo $this->webroot; ?>js/jquery-1.4.2.min.js"></script>

        <link type="text/css" href="<?php echo $this->webroot; ?>js/jquery.ui/css/redmond/jquery-ui-1.8.13.custom.css" rel="stylesheet" />
        <script type="text/javascript" src="<?php echo $this->webroot; ?>js/jquery.ui/jquery-ui-1.8.13.custom.min.js"></script>

    </head>

    <body>
        <div style="margin: 0 auto; width: 750px">
            <?php echo $content_for_layout; ?>
            <?php echo $cakeDebug ?>
        </div>
    </body>
</html>
