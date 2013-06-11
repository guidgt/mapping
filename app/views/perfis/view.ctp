
<script src="<?php echo $this->webroot; ?>js/jquery.contextmenu/jquery.contextmenu.r2.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function(){
        $('#tabpanel').tabs();
    });
</script>

<!-- Data Table -->
<link rel="stylesheet" href="<?php echo $this->webroot; ?>js/jquery.tablesorter/themes/blue/style.css" type="text/css" media="print, projection, screen" />
<script type="text/javascript" src="<?php echo $this->webroot; ?>js/jquery.tablesorter/jquery.tablesorter.js"></script>
<script type="text/javascript">            
    $(document).ready(function(){
        $(".tablesorter").tablesorter(); 
    });
</script>

<div class="toolbar">
    <?php echo $html->link(__('Editar', true), array('action' => 'edit', $perfil['Perfil']['id']), array('class' => 'linkbutton linkbtn btn_edit')); ?>
    <?php echo $html->link(__('Deletar', true), array('action' => 'delete', $perfil['Perfil']['id']), array('class' => 'linkbutton linkbtn btn_delete'), sprintf(__('Deseja realmente apagar?', true), $perfil['Perfil']['id'])); ?>
    <?php echo $html->link(__('Voltar', true), array('action' => 'index'), array('class' => 'linkbutton linkbtn btn_list')); ?>
</div>

<div id="tabpanel">
    <ul>
        <li><a href="#tab1"><span><?php echo __("Visualizar Perfil", true) ?></span></a></li><li><a href="#tab2"><span>Ações</span></a></li></ul>
    <div id="tab1">
        <table cellspacing="3" class="details">
            <tr><td class="left"><?php __('Id'); ?></td><td class="right">
                    <?php echo $perfil['Perfil']['id']; ?></td></tr>		<tr><td class="left"><?php __('Nome'); ?></td><td class="right">
                    <?php echo $perfil['Perfil']['nome']; ?></td></tr>

        </table>
    </div>


    <div id="tab2">
        <?php if (!empty($perfil['Acao'])): ?>
                        <table id="myTable2" class="tablesorter" cellspacing="1">
                            <thead>
                                <tr>
                                    <th><?php __('Id'); ?></th><th><?php __('Nome'); ?></th><th><?php __('Url'); ?></th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th><?php __('Id'); ?></th><th><?php __('Nome'); ?></th><th><?php __('Url'); ?></th>
                                </tr>
                            </tfoot>
                            <tbody>
                <?php
                        $i = 0;
                        foreach ($perfil['Acao'] as $acao):
                            $class = null;
                            if ($i++ % 2 == 0) {
                                $class = ' class="altrow"';
                            }
                ?>
                            <tr<?php echo $class; ?>><td><?php echo $acao['id']; ?></td>
                                <td><?php echo $acao['nome']; ?></td>
                                <td><?php echo $acao['url']; ?></td>
                            </tr>
                <?php endforeach; ?>
                            </tbody>
                    </table>
        <?php endif; ?>
    </div>


</div>
