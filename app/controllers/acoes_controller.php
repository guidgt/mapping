<?php
class AcoesController extends AppController {

	var $name = 'Acoes';
	var $helpers = array('Html', 'Form', 'Jquery');

	function index() {
		$this->Acao->recursive = 0;
		$this->set('acoes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido.', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->set('acao', $this->Acao->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Acao->create();
			if ($this->Acao->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
		$perfis = $this->Acao->Perfil->find('list');
		$this->set(compact('perfis'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Acao->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso.', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Acao->read(null, $id);
		}
		$perfis = $this->Acao->Perfil->find('list');
		$this->set(compact('perfis'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Acao->del($id)) {
			$this->Session->setFlash(__('Registro excluído com sucesso', true));
			$this->redirect(array('action'=>'index'));
		}
	}

}
?>