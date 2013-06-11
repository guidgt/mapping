<?php
class PerfisController extends AppController {

	var $name = 'Perfis';
	var $helpers = array('Html', 'Form', 'Jquery');

	function index() {
		$this->Perfil->recursive = 0;
		$this->set('perfis', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido.', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->set('perfil', $this->Perfil->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Perfil->create();
			if ($this->Perfil->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
		$acoes = $this->Perfil->Acao->find('list');
		$this->set(compact('acoes'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Perfil->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso.', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Perfil->read(null, $id);
		}
		$acoes = $this->Perfil->Acao->find('list');
		$this->set(compact('acoes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Perfil->del($id)) {
			$this->Session->setFlash(__('Registro excluído com sucesso', true));
			$this->redirect(array('action'=>'index'));
		}
	}

}
?>