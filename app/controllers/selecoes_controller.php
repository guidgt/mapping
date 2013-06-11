<?php
class SelecoesController extends AppController {

	var $name = 'Selecoes';
	var $helpers = array('Html', 'Form', 'Jquery');
	

	function index() {
		$usuario = $this->Session->read('Usuario');
		$this->Selecao->recursive = 2;
		if($usuario['Usuario']['perfil_id']==1){
			$this->set('selecoes', $this->paginate());
		}else{
			$this->set('selecoes', $this->paginate(array('usuario_id' => $usuario['Usuario']['id'])));	
		}
		
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid Selecao.', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->set('selecao', $this->Selecao->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {

			$this->Selecao->create();
			$usuario = $this->Session->read('Usuario');
                        $this->data['Selecao']['artigo_id'] = $this->data['Selecao']['artigo_text'];
			$this->data['Selecao']['usuario_id'] = $usuario['Usuario']['id'];
			$this->data['Selecao']['mapeamento_id'] = 1;
			//$this->data['Selecao']['created'] = date(null,'yyyy-mm-dd hh24:i:s');
			if ($this->Selecao->save($this->data)) {
				$this->Session->setFlash(__('Artigo selecionado com sucesso', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('The Selecao could not be saved. Please, try again.', true));
			}
		}
		$motivos = $this->Selecao->Motivo->find('list');
		$usuarios = $this->Selecao->Usuario->find('list');
		$artigos = $this->Selecao->Artigo->find('list');
		$situacoes = $this->Selecao->Situacao->find('list');
		$tipos = $this->Selecao->Tipo->find('list');
		$mapeamentos = $this->Selecao->Mapeamento->find('list');
		$this->set(compact('motivos', 'usuarios', 'artigos', 'situacoes', 'tipos', 'mapeamentos'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid Selecao', true));
			$this->redirect(array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Selecao->save($this->data)) {
				$this->Session->setFlash(__('The Selecao has been saved', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('The Selecao could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Selecao->read(null, $id);
		}
		$motivos = $this->Selecao->Motivo->find('list');
		$usuarios = $this->Selecao->Usuario->find('list');
		$artigos = $this->Selecao->Artigo->find('list');
		$situacoes = $this->Selecao->Situacao->find('list');
		$tipos = $this->Selecao->Tipo->find('list');
		$mapeamentos = $this->Selecao->Mapeamento->find('list');
		$this->set(compact('motivos','usuarios','artigos','situacoes','tipos','mapeamentos'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for Selecao', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Selecao->del($id)) {
			$this->Session->setFlash(__('Selecao deleted', true));
			$this->redirect(array('action'=>'index'));
		}
	}

}
?>