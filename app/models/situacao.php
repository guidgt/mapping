<?php
class Situacao extends AppModel {

	var $name = 'Situacao';
        var $displayField = 'descricao';
	var $validate = array(
		'nome' => array('notempty')
	);

}
?>