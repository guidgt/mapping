
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
		<?php echo $html->link(__('Editar', true), array('action'=>'edit', $colaborador['Colaborador']['id']),array('class'=>'linkbutton linkbtn btn_edit')); ?>
		<?php echo $html->link(__('Deletar', true), array('action'=>'delete', $colaborador['Colaborador']['id']), array('class'=>'linkbutton linkbtn btn_delete'), sprintf(__('Deseja realmente apagar?', true), $colaborador['Colaborador']['id'])); ?>
		<?php echo $html->link(__('Voltar', true), array('action'=>'index'),array('class'=>'linkbutton linkbtn btn_list')); ?>
</div>

<div id="tabpanel">
    <ul>
        <li><a href="#tab1"><span><?php echo __("Visualizar Colaborador",true) ?></span></a></li><li><a href="#tab2"><span>Especialidades</span></a></li></ul>
    <div id="tab1">
        <table cellspacing="3" class="details">
            		<tr><td class="left"><?php __('Id'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['id']; ?></td></tr>		<tr><td class="left"><?php __('Administrador'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['administrador']; ?></td></tr>		<tr><td class="left"><?php __('Usuario'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['usuario']; ?></td></tr>		<tr><td class="left"><?php __('Email'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['email']; ?></td></tr>		<tr><td class="left"><?php __('Nome'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['nome']; ?></td></tr>		<tr><td class="left"><?php __('Senha'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['senha']; ?></td></tr>		<tr><td class="left"><?php __('Contato'); ?></td><td class="right">		
			<?php echo $colaborador['Colaborador']['contato']; ?></td></tr>            
            
        </table>
    </div>
    
    
            
    <div id="tab2">
            <?php if (!empty($colaborador['Especialidade'])):?>
            <table id="myTable2" class="tablesorter" cellspacing="1"> 
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
                    foreach ($colaborador['Especialidade'] as $especialidade):
                            $class = null;
                            if ($i++ % 2 == 0) {
                                    $class = ' class="altrow"';
                            }
                    ?>
<tr<?php echo $class;?>><td><?php echo $especialidade['id'];?></td>
<td><?php echo $especialidade['nome'];?></td>
</tr>
	<?php endforeach;?>            </tbody>
            </table>
    <?php endif; ?>

            
    
    </div>
        
    
    
</div>
