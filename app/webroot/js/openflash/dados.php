<?php
srand((double)microtime()*1000000);

  $data_1 = array(1,2,3,4,5,6,7,8);
  $data_2 = array(8,7,6,5,4,3,2,1);


include_once( 'ofc-library/open-flash-chart.php' );
$g = new graph();
$g->title( 'Planejado Executado', '{font-size: 14px; color: #736AFF}' );

// we add 3 sets of data:
$g->set_data( $data_1 );
$g->set_data( $data_2 );

// we add the 3 line types and key labels
$g->line_dot( 3, 5,'0x9933CC', 'Planejado', 10 );
$g->line_dot( 3, 5, '0xCC3399', 'Executado', 10);    // <-- 3px thick + dots

$g->set_x_labels(array('Funcssss1','Funcsssss2','Funcsssss3','Funcssss4','Funcssss5','Funcssssss6','Funcssss7','Funcssss8'));
$g->set_x_label_style( 10, '0x000000', 1, 1 );

$g->set_tool_tip('#x_label#');

$g->set_y_max( 20 );
$g->y_label_steps( 4 );
$g->set_y_legend( 'Horas', 12, '#736AFF' );

echo $g->render();
?>