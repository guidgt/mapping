<?php

include_once( 'ofc-library/open-flash-chart.php' );

// generate some random data
srand((double)microtime()*1000000);

//
// We are diplaying 3 bar charts, so create 3
// bar chart objects:
//

$bar_1 = new bar( 50, '#0066CC' );
$bar_1->key( 'Planejado', 10 );

$bar_2 = new bar( 50, '#9933CC' );
$bar_2->key( 'Executado', 10 );

//
// NOTE: how we are filling 3 arrays full of data,
//       one for each bar on the graph
//

  $bar_1->data = array(1,2,3,4,5,6,7,8);
  $bar_2->data = array(1,2,3,4,5,6,7,8);


// create the chart:
$g = new graph();
$g->title( 'Bar Chart', '{font-size: 26px;}' );

// add the 3 bar charts to it:
$g->data_sets[] = $bar_1;
$g->data_sets[] = $bar_2;


//
$g->set_x_labels( array( '15/07','16/07','17/07','18/07','19/07','20/07','21/07','22/07') );
// set the X axis to show every 2nd label:
//$g->set_x_label_style( 10, '#9933CC', 0, 2 );
// and tick every second value:

//

$g->set_y_max( 10 );
$g->y_label_steps( 2 );
$g->set_y_legend( 'Open Flash Chart', 12, '0x736AFF' );
echo $g->render();
?>