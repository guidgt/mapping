<?php
/* SVN FILE: $Id: app_controller.php,v 1.1 2011-04-28 00:27:23 roberio Exp $ */
/**
 * Short description for file.
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * PHP versions 4 and 5
 *
 * CakePHP(tm) :  Rapid Development Framework (http://www.cakephp.org)
 * Copyright 2005-2008, Cake Software Foundation, Inc. (http://www.cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright     Copyright 2005-2008, Cake Software Foundation, Inc. (http://www.cakefoundation.org)
 * @link          http://www.cakefoundation.org/projects/info/cakephp CakePHP(tm) Project
 * @package       cake
 * @subpackage    cake.app
 * @since         CakePHP(tm) v 0.2.9
 * @version       $Revision: 1.1 $
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date: 2011-04-28 00:27:23 $
 * @license       http://www.opensource.org/licenses/mit-license.php The MIT License
 */
/**
 * Short description for class.
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package       cake
 * @subpackage    cake.app
 */

//Takenami
class AppController extends Controller {
	
	var $paginate = array('limit' => 20);
	var $redirect = "";
        var $parametros = array(
            'SITUACAO_CONCLUIDA' => 3
        );

	
	/*Metodos protegidos do Controllador*/
	
	protected function getRedirect(){
		return $this->redirect==""?array('action'=>'index'):$this->redirect;
	}
	
	protected function setRedirect($red){
		$this->redirect = $red;
	}
	
	protected function getInst(){ 
		array_push($this->helpers,'Jquery');
		$model_class = $this->modelClass;
		$this->Model = $this->$model_class;
	}
	
	protected function loadbelongsTo(&$Model){
		if(count($Model->belongsTo)>0){
			foreach($Model->belongsTo as $key=>$obj){
				if($obj['className'] == $Model->name){ //Autorelacionamento
					$plural = Inflector::pluralize(strtolower($Model->name));
                    $Parent = $key;
                    $$plural = $Model->$Parent->find('list');
                    $this->set($plural,$$plural);

                }else{
					$plural = Inflector::pluralize(strtolower($obj['className']));
                    $$plural = $Model->$obj['className']->find('list');
                    $this->set($plural,$$plural);
                }
			}
		}
	}
	
	protected function loadhasAndBelongsToMany(&$Model){
		if(count($Model->hasAndBelongsToMany)>0){
			foreach($Model->hasAndBelongsToMany as $obj){
				$plural = Inflector::pluralize(strtolower($obj['className']));
				$$plural = $Model->$obj['className']->find('list');
				$this->set(compact($plural));
			}
		}
	}
	
	function help(){
		$this->getInst();
		$this->render('/pages/help');
	}
	
	function index() {
		$this->getInst();
		$this->Model->recursive = 0;
		$this->set($this->viewPath, $this->paginate());
	}

	function view($id = null) {
		$this->getInst();
		if (!$id) {
			$this->Session->setFlash(__($this->modelClass.' Invalido.', true));
			$this->redirect($this->getRedirect());
		}
		$this->set($this->modelKey, $this->Model->read(null, $id));
	}

	function add() {
		$this->getInst();
		if (!empty($this->data)) {
			$this->Model->create();
			if ($this->Model->save($this->data)) {
				$this->Session->setFlash(__($this->modelClass.' foi salvo com sucesso.', true));
				$this->redirect($this->getRedirect());
			} else {
				$this->Session->setFlash(__('ERRO ao salvar '.$this->modelClass.'. Verifique os problemas e tente novamente.', true));
			}
		}
		$this->loadbelongsTo($this->Model);
		$this->loadhasAndBelongsToMany($this->Model);
	}

	function edit($id = null) {
		$this->getInst();
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__($this->modelClass.' Inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Model->save($this->data)) {
				$this->Session->setFlash(__($this->modelClass.' foi salvo com sucesso', true));
				$this->redirect($this->getRedirect());
			} else {
				$this->Session->setFlash(__('ERRO ao salvar '.$this->modelClass.'. Verifique os problemas e tente novamente.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Model->read(null, $id);
			$this->loadbelongsTo($this->Model);
			$this->loadhasAndBelongsToMany($this->Model);
		}
	}

	function delete($id = null) {
		$this->getInst();
		if (!$id) {
			$this->Session->setFlash(__('Identificador inválido para '.$this->modelClass, true));
			$this->redirect($this->getRedirect());
		}
		if ($this->Model->del($id)) {
			$this->Session->setFlash(__($this->modelClass.' Excluido', true));
			$this->redirect($this->getRedirect());
		}
	}	
	
	function deleteselected($id = null) {
		$this->getInst();
		if (!$id) {
			$this->Session->setFlash(__('Identificador inválido para '.$this->modelClass, true));
			$this->redirect($this->getRedirect());
		}

		if ($this->Model->deleteAll($this->modelClass.".".$this->Model->primaryKey." in (".$id.")")) {
			$this->Session->setFlash(__('Registros excluidos com sucesso', true));
			$this->redirect($this->getRedirect());
		}
	}

        function beforeFilter() {
            $usuario = $this->Session->read('Usuario');
            if( $usuario ) {
                $this->set('menu_acoes', $usuario['Acao']);
                if($this->params['controller']!='pages'){
                    $url = $this->params['controller'].'/'.$this->params['action'];
                    if(!isset($usuario['Acao'][$url])){
			$this->Session->setFlash(__('Usuário não possui permissão para executar a ação solicitada!', true));
                        $this->redirect('/');
                    }
                }
            } else {
                $this->redirect(array('controller'=>'usuarios', 'action'=>'index'));
            }

        }
	
}
?>
