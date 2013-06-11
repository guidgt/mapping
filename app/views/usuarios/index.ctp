
    <?php echo $form->create('Usuario', array('action'=>'index')); ?>
        <table cellspacing="3" class="details">
            <?php
            echo $jquery->input('usuario', array('error' => false, 'div' => false, 'before' => '<tr><td class="left">', 'after' => '</td></tr>', 'between' => '</td><td class="login-right">'));
            echo $jquery->input('senha', array('error' => false, 'type'=>'password', 'div' => false, 'before' => '<tr><td class="left">', 'after' => '</td></tr>', 'between' => '</td><td class="login-right">'));
            ?>
            <tr>
                <td class="left"></td><td class="right"><?php echo $form->submit(__('Iniciar', true), array('style' => 'font-size:11px', 'class' => 'formbtn btn_salvar')); ?></td>
            </tr>
        </table>
    <?php echo $form->end(); ?>
