<?php
/**
 * Regras de pluralização e singualização do português
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @author        Sadjow Medeiros Leão <sadjow@gmail.com>
 * @author        Juan Basso <jrbasso@gmail.com>
 * @license       http://www.opensource.org/licenses/mit-license.php The MIT License
 */

	$pluralRules = array(
		'/^(.*)ao$/i' => '\1oes',
		'/^(.*)(r|s|z)$/i' => '\1\2es',
		'/^(.*)(a|e|o|u)l$/i' => '\1\2is',
		'/^(.*)il$/i' => '\1is',
		'/^(.*)(m|n)$/i' => '\1ns',
		'/^(.*)$/i' => '\1s',
		'/([t])a$/i' => '\1a',
	);

	$uninflectedPlural = array('atlas', 'lapis', 'onibus', 'pires', 'virus', '.*x');

	$irregularPlural = array(
		'fase' => 'fases',
		'perfil' => 'perfis',
		'release' => 'releases'
	);

	$singularRules = array(
		'/^(.*)(oes|aes|aos)$/i' => '\1ao',
		'/^(.*)(a|e|o|u)is$/i' => '\1\2l',
		'/^(.*)e?is$/i' => '\1il',
		'/^(.*)(software)s$/i' => '\1\2',
		'/^(.*)(r|s|z)es$/i' => '\1\2',
		'/^(.*)ns$/i' => '\1m',
		'/^(.*)s$/i' => '\1',
		'/([t])a$/i' => '\1a',
	);

	$uninflectedSingular = $uninflectedPlural;

	$irregularSingular = array_flip($irregularPlural);
?>
