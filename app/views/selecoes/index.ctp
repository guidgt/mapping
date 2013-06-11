<script src="<?php echo $this->webroot;?>js/jquery.contextmenu/jquery.contextmenu.r2.js" type="text/javascript"></script>
<link rel="stylesheet" href="<?php echo $this->webroot;?>js/jquery.tablesorter/themes/blue/style.css" type="text/css" media="print, projection, screen" />
<script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.tablesorter/jquery.tablesorter.js"></script>



<script type="text/javascript">
    $(function() {
        $('#tabpanel').tabs();
    });

    $(document).ready(function() {
        $(".tablesorter").tablesorter(); //criar ordenação no grid
    });
</script>



<script>
    function selecionados() {
        chs = $(".chk").get();
        saida = "";
        for (i = 0; i < chs.length; i++) {
            saida = chs[i].checked ? saida + "," + chs[i].value : saida;
        }
        return saida.substring(1, saida.length);
    }
    function selecionarTodos() {
        chs = $(".chk").get();
        saida = "";
        for (i = 0; i < chs.length; i++) {
            if (chs[i].checked) {
                chs[i].checked = false;
            } else {
                chs[i].checked = true;
            }
        }
    }
</script>

<div class="toolbar">
    <?php echo $html->link(__('Nova Seleção', true), 'add', array('class' => 'linkbutton linkbtn btn_add')); ?>
    <a href="#" onclick="location.href = '<?php echo $this->webroot; ?>selecoes/deleteselected/' + selecionados()" class="linkbutton linkbtn btn_delete">Excluir Vários</a>

    <?
    $total = $paginator->counter(array('format' => '%pages%', true));
    if ($total != 1) {
        echo "&nbsp;";
        $ant = $paginator->current() - 1;
        $prox = $paginator->current() + 1;

        $sort = isset($paginator->params['named']['sort']) ? '/sort:' . $paginator->params['named']['sort'] : "";
        $direction = isset($paginator->params['named']['direction']) ? '/direction:' . $paginator->params['named']['direction'] : "";

        echo $html->link(__(null, true), 'index/page:' . $ant . $sort . $direction, array('class' => 'linkbutton linkbtn btn_back')) . "&nbsp;";
        echo '<select style="height:22px;font-size:13px" onchange="location.href=\'' . $this->webroot . 'cargos/index/page:\'+this.value+\'' . $sort . $direction . '\'">';
        for ($x = 1; $x <= $total; $x++) {
            echo $x == $paginator->current() ? "<option selected value=\"$x\">" . $x . "</option>" : "<option value=\"$x\">" . $x . "</option>";
        }
        echo "</select>&nbsp;";
        echo $html->link(__(null, true), 'index/page:' . $prox . $sort . $direction, array('class' => 'linkbutton linkbtn btn_go'));
    }
    ?>



</div>


<div id="tabpanel">
    <ul>
        <li><a href="#tab1"><span><?php echo __("Selecionar Trabalhos", true) ?></span></a></li>
    </ul>
    <div id="tab1">

        <table id="myTable" class="tablesorter" cellspacing="1"> 
            <thead> 
                <tr>
                    <th align="center" style="width:20px;padding: 0px 0px 0px 0px"><input type="checkbox" onclick="selecionarTodos()"></th>
                    <th><?php echo $paginator->sort('artigo_id'); ?></th>
                    <th><?php echo $paginator->sort('situacao_id'); ?></th>
                    <th><?php echo $paginator->sort('usuario_id'); ?></th>
                    <th><?php echo $paginator->sort('revisor'); ?></th>
                    <th><?php echo $paginator->sort('critérios'); ?></th>
                </tr>
            </thead> 

            <tbody> 
                <?php
                $i = 0;
                //debug($selecoes);
                foreach ($selecoes as $selecao):
                    $class = null;
                    if ($i++ % 2 == 0) {
                        $class = ' class="altrow"';
                    }
                    ?>
                    <tr<?php echo $class; ?>>

                        <td align="center" style="padding: 0px 0px 0px 0px">
                            <input type="checkbox" class="chk" value="<?= $selecao['Selecao']['id'] ?>">
                        </td>

                        <td>
                            <?php echo $selecao['Selecao']['artigo_id']; ?>
                        </td>
                        <td>
                            <?php echo $selecao['Situacao']['descricao']; ?>
                        </td>
                         <td>
                            <?php echo $selecao['Usuario']['nome']; ?>
                        </td>
                         <td>
                            <?php echo $selecao['Usuario']['revisor']; ?>
                        </td>
                        <td>
                            <?php echo $selecao['Motivo'][0]['descricao']; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>

            </tbody> 
        </table>

    </div>
</div>