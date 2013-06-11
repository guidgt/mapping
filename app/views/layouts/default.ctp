<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">		
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-cache">

        <title>Mapeamento Sistematico</title>

         <!-- Padrão -->
        <link rel="stylesheet" href="<?php echo $this->webroot;?>css/default.css" type="text/css" />
        <link type="text/css" href="<?php echo $this->webroot;?>js/jquery.ui/css/redmond/jquery-ui-1.7.2.custom.css" rel="stylesheet" />
        <link type="text/css" href="<?php echo $this->webroot;?>js/jquery.fg-menu/fg.menu.css" media="screen" rel="stylesheet" />
        <!--<link rel="stylesheet" href="<?php echo $this->webroot;?>js/jdMenu/jdMenu.css" type="text/css" />-->

        <!--Script-->
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery-1.3.2.min.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.maskedinput-1.2.2.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/base64.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.price_format.1.3.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.ui/jquery-ui-1.7.2.custom.min.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.fg-menu/fg.menu.js"></script>
        <!--<script type="text/javascript" src="<?php echo $this->webroot;?>js/jdMenu/jquery.jdMenu.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jdMenu/jquery.dimensions.js"></script>-->
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.jstree/jquery.tree.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.trule.common-min.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.trule-min.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/messages.pt-br.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/validate.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.dualListBox-1.0.1.min.js"></script>
        <script type="text/javascript" src="<?php echo $this->webroot;?>js/geral.js"></script>

        <style type="text/css" >
            .frameBody{font-family:sans-serif;font-size:12px;margin:0;width:100%;height:100%}
            .frameBody p{border:1px #bbb solid;padding:2px}
            .rte-zone{width:450px;margin:0;padding:0;height:100px;border:1px #999 solid;clear:both}
            .rte-toolbar{overflow:hidden}
            .rte-toolbar a,.rte-toolbar a img{border:0}
            .rte-toolbar p{float:left;margin:0;padding-right:5px}
        </style>

    </head>

    <body>

        <table cellspacing="0" cellspacing="0" width="100%">
            <tr>
                <td style="background:url(<?php echo $this->webroot; ?>img/bg.jpg);height:40px"></td>
            </tr>
        </table>

        <script type="text/javascript">
            $(function(){

                $('#menubar > a').each(function(){
                    firstnivel = $(this).attr("id");
                    if(firstnivel)
                        $('#'+firstnivel).menu({
                            content: $('#'+firstnivel).next().html(),
                            flyOut: true
                        });
                })

                $('.right textarea').addClass('rte-zone');
                $('.right textarea').rte("<?php echo $this->webroot; ?>css/rte.css", "<?php echo $this->webroot; ?>img/rte/");

            });
        </script>

       	<div class="menubar" id="menubar">
            <?php
            if(isset($menu_acoes)){
                $grupo = null;
                $index = 10;
                foreach ($menu_acoes as $key => $val) {
                    if( !empty($val['label']) ){
                        if($val['grupo']!=$grupo){
                            if($grupo!=null)
                                echo '</ul></div>';
                            $grupo = $val['grupo'];
                            echo '<a href="#" id="menu'.$index.'" class="menubutton">'.$grupo.'</a><div class="hidden"><ul>';
                            $index++;
                        }
                        echo '<li><a onclick="location.href=\''.$this->webroot.$key.'\'" href="#">'.$val['label'].'</a></li>';
                    }
                }
                if($grupo!=null)
                    echo '</ul></div>';
                echo '<a href="'.$this->webroot.'usuarios/logout" class="menubutton">Logout</a>';
            }
            ?>
        </div>

        <?php if ($session->check('Message.flash') && count($jquery->validationErrors) == 0) {
        ?>
            <script>
                window.onload = function(){
                    setInterval("document.getElementById('msginfo').style.display='none'", 5000);
                }
            </script>
            <div id="msginfo" style="z-index:10000;position:absolute;top:100px;right:35%;left:35%" class="ui-widget">
                <div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;">
                    <br>
                    <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
                <? $session->flash(); ?>
                <br>
            </div>
        </div>
        <?php } ?>

            <div style="padding:8px">
            <?php echo $content_for_layout; ?>
            <?php echo $cakeDebug ?>
        </div>
    </body>
</html>
