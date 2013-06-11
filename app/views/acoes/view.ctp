
<script src="<?php echo $this->webroot;?>js/jquery.contextmenu/jquery.contextmenu.r2.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function(){
        $('#tabpanel').tabs();
    });
</script>

<!-- Data Table -->
<link rel="stylesheet" href="<?php echo $this->webroot;?>js/jquery.tablesorter/themes/blue/style.css" type="text/css" media="print, projection, screen" />
<script type="text/javascript" src="<?php echo $this->webroot;?>js/jquery.tablesorter/jquery.tablesorter.js"></script>
<script type="text/javascript">            
    $(document).ready(function(){
        $(".tablesorter").tablesorter(); 
    });
</script>

<div class="toolbar">
		<?php echo $html->link(__('Editar', true), array('action'=>'edit', $acao['Acao']['id']),array('class'=>'linkbutton linkbtn btn_edit')); ?>
		<?php echo $html->link(__('Deletar', true), array('action'=>'delete', $acao['Acao']['id']), array('class'=>'linkbutton linkbtn btn_delete'), sprintf(__('Deseja realmente apagar?', true), $acao['Acao']['id'])); ?>
		<?php echo $html->link(__('Voltar', true), array('action'=>'index'),array('class'=>'linkbutton linkbtn btn_list')); ?>
</div>

<div id="tabpanel">
    <ul>
        <li><a href="#tab1"><span><?php echo __("Visualizar Ação",true) ?></span></a></li><li><a href="#tab2"><span>Perfil</span></a></li></ul>
    <div id="tab1">
        <table cellspacing="3" class="details">
            		<tr><td class="left"><?php __('Id'); ?></td><td class="right">		
			<?php echo $acao['Acao']['id']; ?></td></tr>
                        <tr><td class="left"><?php __('Nome'); ?></td><td class="right">
			<?php echo $acao['Acao']['nome']; ?></td></tr>
                        <tr><td class="left"><?php __('Url'); ?></td><td class="right">
			<?php echo $acao['Acao']['url']; ?></td></tr>
                        <tr><td class="left"><?php __('Label'); ?></td><td class="right">
			<?php echo $acao['Acao']['label']; ?></td></tr>
                        <tr><td class="left"><?php __('Grupo'); ?></td><td class="right">
			<?php echo $acao['Acao']['grupo']; ?></td></tr>
            
        </table>
    </div>
    
    
    <div id="tab2">
            <?php if (!empty($acao['Perfil'])):?>
            <table id="myTable3" class="tablesorter" cellspacing="1"> 
            <thead> 
               <tr>
                <th><?php __('Id'); ?></th><th><?php __('Nome'); ?></th>                </tr>
            </thead> 
            <tfoot> 
                <tr>
                <th><?php __('Id'); ?></th><th><?php __('Nome'); ?></th>                </tr>
            </tfoot> 
            <tbody>
    <?php
                    $i = 0;
                    foreach ($acao['Perfil'] as $perfil):
                            $class = null;
                            if ($i++ % 2 == 0) {
                                    $class = ' class="altrow"';
                            }
                    ?>
<tr<?php echo $class;?>><td><?php echo $perfil['id'];?></td>
<td><?php echo $perfil['nome'];?></td>
</tr>
	<?php endforeach;?>            </tbody>
            </table>
    <?php endif; ?>

            
    
    </div>
        
    
    
</div>
