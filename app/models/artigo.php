<?php
class Artigo extends AppModel {

	var $name = 'Artigo';
        var $displayField = 'identificador';

	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $belongsTo = array(
		'Mapeamento' => array(
			'className' => 'Mapeamento',
			'foreignKey' => 'mapeamento_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasMany = array(
		'Selecao' => array(
			'className' => 'Selecao',
			'foreignKey' => 'artigo_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
?>