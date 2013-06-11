<?
class DATEFORMAT
{
	const DMY = 0;
	const MDY = 1;
	const YMD = 2;
}

class DATEUNIT
{
	const MICROSECOND = 'MICROSECOND';
	const SECOND = 'SECOND';
	const MINUTE = 'MINUTE';
	const HOUR = 'HOUR';
	const DAY = 'DAY';
	const WEEK = 'WEEK';
	const MONTH = 'MONTH';
	const QUARTER = 'QUARTER';
	const YEAR = 'YEAR';
}

class DateUtil
{
	/**
	* Retorna data Atual
	*@param DATEFORMAT $dateFormat
	*@return string 
	*/
	public static function Today($dateFormat = DATEFORMAT::YMD)
	{
		$dateStr = getdate();
		return DateUtil::FormatDate($dateStr[0], $dateFormat);
	}

	/**
	 * Get the Date string from a date in timestamp format
	 *
	 * @param int $timestamp
	 * @param DATEFORMAT $dateFormat
	 * @param string $separator
	 * @param bool $showHours
	 * @return string
	 */
	public static function FormatDate($timestamp, $dateFormat = DATEFORMAT::YMD, $separator = "-", $showHours = false)
	{
		$strClock = '';
		if($showHours)
		{
			$strClock = ' %H:%M:%S';
		}

		if (strpos(".-/", $separator)===false)
		{
			throw new Exception("Separador de data deve ser . - ou /");
		}
		switch ($dateFormat)
		{
			case DATEFORMAT::DMY:
				{
					return strftime("%d$separator%m$separator%Y" . $strClock, $timestamp);
					break;
				}
			case DATEFORMAT::MDY:
				{
					return strftime("%m$separator%d$separator%Y" . $strClock, $timestamp);
					break;
				}
			default:
				{
					return strftime("%Y$separator%m$separator%d" . $strClock, $timestamp);
					break;
				}
		}
	}

	/**
	* adiciona dias para uma data
	*@param string $date
	*@param int $days
	*@param DATEFORMAT $dateFormat
	*@return string 
	*/
	public static function DateAdd($date, $days, $dateFormat = DATEFORMAT::YMD)
	{
		$timestamp = strtotime("$days day", DateUtil::TimeStampFromStr($date, $dateFormat));
		return DateUtil::FormatDate($timestamp, $dateFormat);
	}
	
	
	public static function numericWeekDay($date,$dateFormat = DATEFORMAT::YMD)
	{
		return date("w", DateUtil::TimeStampFromStr($date,$dateFormat));
	}

	/**
	 * Invervalo de datas
	 *
	 * @param string $date
	 * @param int $value
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function Interval($date, $value, $unit)
	{
		return strtotime("$value $unit", DateUtil::ConvertToTimeStamp($date));
	}

	/**
	 * Invervalo de data com Hora
	 *
	 * @param string $date
	 * @param int $value
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function IntervalToDateTime($date, $value, $unit)
	{
		return DateUtil::FormatDate(DateUtil::Interval($date, $value, $unit), DATEFORMAT::YMD, '-', true);
	}
	
	/**
	 * Invervalo de data
	 *
	 * @param string $date
	 * @param int $value
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function IntervalToDate($date, $value, $unit)
	{
		return DateUtil::FormatDate(DateUtil::Interval($date, $value, $unit), DATEFORMAT::YMD, '-', false);
	}

	/**
	 * Invervalo de datas
	 *
	 * @param string $date
	 * @param int $value
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function IntervalToBrazilDate($date, $value, $unit)
	{
		return DateUtil::FormatDate(DateUtil::Interval($date, $value, $unit), DATEFORMAT::DMY, '/', false);
	}



	/**
	 * Invervalo de datas
	 *
	 * @param string $date
	 * @param int $value
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function IntervalToBrazilDateTime($date, $value, $unit)
	{
		return DateUtil::FormatDate(DateUtil::Interval($date, $value, $unit), DATEFORMAT::DMY, '/', true);
	}



	/**
	 * Converte qualquer data para TimeStamp
	 *
	 * @param string $date
	 * @return int
	 */
	public static function ConvertToTimeStamp($date)
	{
		$sep = '-';
		$arrDate = explode(' ', $date);
		if (strpos($arrDate[0], $sep) === false)
		{
			$sep = '/';
		}

		$arrDateParts = explode($sep, $arrDate[0]);

		//ano primeiro?
		if (strlen($arrDateParts[0]) > 2)
		{
			return DateUtil::TimeStampFromStr($date, DATEFORMAT::YMD);
		}

		return DateUtil::TimeStampFromStr($$date, DATEFORMAT::DMY);
	}
	
	/**
	 * Calcular a diferença entre datas
	 *
	 * Ex.: DateDiff(2007-11-21, 2007-10-21);
	 * Returns 30 days
	 * 
	 * @param string $final_date
	 * @param string $date_initial
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function DateDiff($final_date, $date_initial,$unit = DATEUNIT::DAY)
	{
		$from_date = self::TimeStampFromStr($final_date,DATEFORMAT::YMD);
		$to_date = self::TimeStampFromStr($date_initial,DATEFORMAT::YMD);		

                return self::TimeStampDiff($from_date, $to_date, $unit);
	}

        /**
	 * Calcular a diferença entre datas
	 *
	 * Ex.: DateDiff(2007-11-21, 2007-10-21);
	 * Returns 30 days
	 *
	 * @param string $final_date
	 * @param string $date_initial
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function DateDiffToBrazil($final_date, $date_initial,$unit = DATEUNIT::DAY)
	{
		$from_date = self::TimeStampFromStr($final_date,DATEFORMAT::DMY);
		$to_date = self::TimeStampFromStr($date_initial,DATEFORMAT::DMY);

                return self::TimeStampDiff($from_date, $to_date, $unit);
	}

        /**
	 * Calcular a diferença entre datas
	 *
	 * Ex.: DateDiff(2007-11-21, 2007-10-21);
	 * Returns 30 days
	 *
	 * @param string $final_date
	 * @param string $date_initial
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function TimeStampDiff($from_date, $to_date,$unit = DATEUNIT::DAY)
	{
		if($unit == DATEUNIT::MONTH ){
			$months= ($from_date - $to_date)/2628000;
			return ceil($months);
		}
		elseif($unit == DATEUNIT::YEAR ){
			$anos = ($from_date - $to_date)/31536000;
			return floor($anos);
		}elseif($unit == DATEUNIT::WEEK){
			$week = ($from_date - $to_date)/657000;
			return ceil($week);
		}else
		{
			$days = ($from_date - $to_date)/86400;
			return ceil($days);
		}
	}


	/**
	 * Calcular a diferença entre datas considerando horas
	 *
	 * Ex.: DateDiff(2007-11-21, 2007-10-21);
	 * Returns 30 days
	 *
	 * @param string $final_date
	 * @param string $date_initial
	 * @param DATEUNIT $unit
	 * @return int
	 */
	public static function DateTimeDiff($final_date, $date_initial,$unit = DATEUNIT::DAY)
	{
		$from_date = self::TimeStampFromStr($final_date,DATEFORMAT::YMD);
		$to_date = self::TimeStampFromStr($date_initial,DATEFORMAT::YMD);

		if($unit == DATEUNIT::MONTH ){
			$months= ($from_date - $to_date)/2628000;
			return ceil($months);
		}
		elseif($unit == DATEUNIT::YEAR ){
			$anos = ($from_date - $to_date)/31536000;
			return floor($anos);
		}elseif($unit == DATEUNIT::WEEK){
			$week = ($from_date - $to_date)/657000;
			return ceil($week);
		}elseif($unit == DATEUNIT::DAY){
			$days = ($from_date - $to_date)/86400;
			return ceil($days);
		}elseif($unit == DATEUNIT::HOUR){
			$hour = ($from_date - $to_date)/3600;
			return ceil($hour);
		}elseif($unit == DATEUNIT::MINUTE){
			$minute = ($from_date - $to_date)/60;
			return ceil($minute);
		}elseif($unit == DATEUNIT::SECOND){
			$second = ($from_date - $to_date)/60;
			return ceil($second);
		}else {
			return 0;
		}
	}

        /**
	 * Converte de DateTime para uma data em string
	 * Ex.: 2007-10-20 15:25:00 para 20/10/2007 15:25:00
	 *
	 * @param string $date
	 * @param DATEFORMAT $dateformat
	 * @param char $separator
	 * @param bool $showHours
	 * @return string
	 */
	public static function DateFormatFromDateTime($date, $dateformat = DATEFORMAT::YMD, $separator = '-', $showHours = true)
	{
		return self::FormatDate(self::TimeStampFromStr($date, DATEFORMAT::YMD), $dateformat, $separator, $showHours);
	}
	/**
	 * Converte uma data em string para DateTime
	 * ex: 20/10/2007 para 2007-10-20 00:00:00
	 *
	 * @param string $date
	 * @param DATEFORMAT $dateformat
	 * @param char $separator
	 * @param bool $showHours
	 * @return string
	 */
	public static function DateTimeFromStr($date, $dateformat = DATEFORMAT::DMY)
	{
		return self::FormatDate(self::TimeStampFromStr($date, $dateformat), DATEFORMAT::YMD, '-', true);
	}
	/**
	 * Converte uma data em string para Date
	 * ex: 20/10/2007 para 2007-10-20
	 *
	 * @param string $date
	 * @param DATEFORMAT $dateformat
	 * @return string
	 */
	public static function DateFromStr($date, $dateformat = DATEFORMAT::DMY)
	{
		return self::FormatDate(self::TimeStampFromStr($date, $dateformat), DATEFORMAT::YMD, '-', false);
	}
	
	/**
	 * Converte timestamp para Data
	 * ex: 13123123 para 2007-10-20
	 *
	 * @param int $timestamp
	 * @param DATEFORMAT $dateformat
	 * @return string
	 */
	public static function DateFromTimestamp($timestamp, $dateformat = DATEFORMAT::DMY)
	{
		return self::FormatDate($timestamp, DATEFORMAT::YMD, '-', false);
	}
	
	/**
	 * Converte timestamp para Data com hora
	 * ex: 13123123 para 2007-10-20
	 *
	 * @param int $timestamp
	 * @param DATEFORMAT $dateformat
	 * @return string
	 */
	public static function DateTimeFromTimestamp($timestamp, $dateformat = DATEFORMAT::DMY)
	{
		return self::FormatDate($timestamp, DATEFORMAT::YMD, '-', true);
	}

	/**
	* Converte timestamp para Data String
	*@param strint $date
	*@param DATEFORMAT $dateFormat
	*@return string 
	*/
	public static function TimeStampFromStr($date, $dateFormat = DATEFORMAT::YMD)
	{
		$timestamp = -1;
		switch ($dateFormat)
		{
			case DATEFORMAT::DMY:
				{
					$reg = preg_split("/[^0-9]/", $date);
					@$timestamp = mktime(0, 0, 0, $reg[1], $reg[0], $reg[2]);
					break;
				}
			case DATEFORMAT::MDY:
				{
					$reg = preg_split("/[^0-9]/", $date);
					@$timestamp = mktime(0, 0, 0, $reg[0], $reg[1], $reg[2]);
					break;
				}
			default:
				{
					$timestamp = strtotime($date);
					break;
				}
		}
		if ($timestamp == -1)
		{
			throw new Exception(700, "Erro em formatar timestamp date");
		}
		else
		{
			return $timestamp;
		}
	}

	/**
	 * Data Atual
	 *
	 * @param DATEFORMAT $dateFormat
	 * @param string $separator
	 * @param bool $showHours
	 * @return string
	 */
	public static function Now($dateFormat = DATEFORMAT::YMD, $separator = '-', $showHours = false)
	{
		$time = '';
		if ($showHours)
		{
			$time = ' H:i:s';
		}

		switch ($dateFormat)
		{
			case DATEFORMAT::DMY:
				{
					return date('d' . $separator . 'm' . $separator . 'Y' . $time);
					break;
				}
			case DATEFORMAT::MDY:
				{
					return date('m' . $separator . 'd' . $separator . 'Y' . $time);
					break;
				}
			default:
				{
					return date('Y' . $separator . 'm' . $separator . 'd'  . $time);
					break;
				}
		}
	}



	/**
	 * Data e linguagem
	 * Ex: en-us = April 29, 2006
	 * Ex: pt-br = 29 de Abril de 2006
	 *
	 * @param int $timestamp
	 * @param string $lang
	 * @return string
	 */
	public static function DataFull($timestamp, $lang = 'en-us')
	{
		switch ($lang)
		{
			case 'pt-br':
				{
					$arrayDate = getdate($timestamp);
					$month = '';
					switch ($arrayDate['mon'])
					{
						case 1: $month = 'Janeiro'; break;
						case 2: $month = 'Fevereiro'; break;
						case 3: $month = 'Março'; break;
						case 4: $month = 'Abril'; break;
						case 5: $month = 'Maio'; break;
						case 6: $month = 'Junho'; break;
						case 7: $month = 'Julho'; break;
						case 8: $month = 'Agosto'; break;
						case 9: $month = 'Setembro'; break;
						case 10: $month = 'Outubro'; break;
						case 11: $month = 'Novembro'; break;
						case 12: $month = 'Dezembro'; break;
					}
					return $arrayDate['mday'] . ' de ' . $month . ' de ' . $arrayDate['year'];
					break;
				}
			default:
				{
					return date('F j, Y', $timestamp);
					break;
				}
		}
	}

	/**
	 * Pega data Vazio
	 *
	 * @param DATEFORMAT $dateFormat
	 * @param string $separator
	 * @return string
	 */
	public static function EmptyDate($separator = '-')
	{
		return '0000' . $separator . '00' . $separator . '00 00:00:00';
	}

	/**
	 * Pega timestamp datetime para Data Atual
	 *
	 * @return int
	 */
	public static function Timestamp()
	{
		return time();
	}

	/**
	 * Pega Proxima Semana
	 * 2007-06
	 *
	 * @return string
	 */
	public static function NextMonth($dateFormat = '')
	{
		$y = date('Y');
		$m = date('m');
		
		if($dateFormat){
			if(preg_match("~\/~", $dateFormat) == 0)
			{
				$data = explode("-", $dateFormat);	
				$y = $data[0];
				$m = $data[1];
						
			}else 
			{
				$data = explode("/", $dateFormat);	
				$y = $data[2];
				$m = $data[1];
			}
				
		}else {
			
		}		
		
		if ($m == 12)
		{
			$m = 0;
			$y++;
		}
		$m++;
		if($m >=1 || $m <=9)
			$m = '0'.$m;
		return "$y-$m";
	}

	/**
	 * Pega proximo mês mais 1
	 * 2007-06
	 *
	 * @return string
	 */
	public static function NextMonthMoreOne()
	{
		$y = date('Y');
		$m = date('m');
		if ($m == 12)
		{
			$m = 0;
			$y++;
		}
		$m++;
		if ($m == 12)
		{
			$m = 0;
			$y++;
		}
		$m++;
		return "$y-$m";
	}

	/**
	 * Obtem o nome do mês em PT-BR
	 *
	 * @param int $num
	 * @return string
	 */
	public static function BrazilMonth($num)
	{
		switch ($num)
		{
			case 1: $mes = "Janeiro"; break;
			case 2: $mes = "Fevereiro"; break;
			case 3: $mes = "Março"; break;
			case 4: $mes = "Abril"; break;
			case 5: $mes = "Maio"; break;
			case 6: $mes = "Junho"; break;
			case 7: $mes = "Julho"; break;
			case 8: $mes = "Agosto"; break;
			case 9: $mes = "Setembro"; break;
			case 10: $mes = "Outubro"; break;
			case 11: $mes = "Novembro"; break;
			case 12: $mes = "Dezembro"; break;
		}
		return $mes;
	}
	
	
	/**
	 * Obtem o nome do Semana em PT-BR
	 *
	 * @param int $num
	 * @return string
	 */
	public static function BrazilWeek($num = false)
	{
		$week = array(
			'Domingo',
			'Segunda',
			'Terça',
			'Quarta',
			'Quinta',
			'Sexta',
			'Sábado',
		);
		if($num)
		{
			return $week[$num];
		}
		return $week;		
	}
	
	
	/**
	 * Retorna Data Atual
	 *
	 * @param DATEFORMAT $dateFormat
	 * @param string $separator
	 * @return string
	 */
	public static function NowDate($dateFormat = DATEFORMAT::YMD, $separator = '-')
	{
		switch ($dateFormat)
		{
			case DATEFORMAT::DMY:
				{
					return date('d' . $separator . 'm' . $separator . 'Y');
					break;
				}
			case DATEFORMAT::MDY:
				{
					return date('m' . $separator . 'd' . $separator . 'Y');
					break;
				}
			default:
				{
					return date('Y' . $separator . 'm' . $separator . 'd');
					break;
				}
		}
	}
	/**
	 * Retorna Hora Atual
	 *
	 * @return string
	 */
	public static function NowTime()
	{
		$localtime = localtime();
		return date($localtime[2].':'.$localtime[1].':'.$localtime[0]);
	}

	/**
	 * Retorna o mês atual ou de uma data Passada por parametro
	 * 	
	 * @return int
	 */
	public static function Month($dateFormat = '')
	{
		if($dateFormat){
			if(preg_match("~\/~", $dateFormat) == 0)
			{
				$data = explode("-", $dateFormat);				
			}else 
			{
				$data = explode("/", $dateFormat);	
			}
			return $data[1];			
		}
		return date('m');
	}
	
	/**
	 * Retorna o dia atual ou de uma data Passada por parametro
	 * 	
	 * @return int
	 */
	public static function Day($dateFormat = '')
	{
		if($dateFormat){
			if(preg_match("~\/~", $dateFormat) == 0)
			{
				$data = explode("-", $dateFormat);	
				return $data[2];				
			}else 
			{
				$data = explode("/", $dateFormat);	
				return $data[0];	
			}
					
		}
		return intval(date('d'));
	}
	
	


	public static function dateFormate($dateString) {				
		return implode(preg_match("~\/~", $dateString) == 0 ? "/" : "-", array_reverse(explode(preg_match("~\/~", $dateString) == 0 ? "-" : "/", $dateString)));
	}
	
	public static function dateTimeFormate($datetimeString) {
		$retorno = explode(" ", $datetimeString);
		if (preg_match("~:~", $retorno[0])) {
			$hora = explode(":", $retorno[0]);
			$data = $this->dateFormate($retorno[1]);
		} else {
			$hora = explode(":", $retorno[1]);
			$data = $this->dateFormate($retorno[0]);
		}
		return $data . " " . $hora[0] . ":" . $hora[1];
	}
	
	public static function getStartDateOfWeek($date , $startDayWeek = 0, $startMonth = true, $dateFormat = DATEFORMAT::YMD ){
		
		if($startMonth) {
			$primeiroDiaMes = date("Y-m-01", DateUtil::TimeStampFromStr($date,$dateFormat));
			$numDiaSemana = self::numericWeekDay($primeiroDiaMes,$dateFormat);		
			$diaInicioSemanaMes = self::DateFromTimestamp(strtotime("-$numDiaSemana day", DateUtil::TimeStampFromStr($primeiroDiaMes, $dateFormat)));		
			return $diaInicioSemanaMes;
		}else{
			$numDiaSemana = self::numericWeekDay($date,$dateFormat);
			
			if($numDiaSemana > $startDayWeek){
				$numControle = $numDiaSemana - $startDayWeek;
				$diaInicioSemanaMes = self::DateFromTimestamp(strtotime("-$numControle day", DateUtil::TimeStampFromStr($date, $dateFormat)));	
			}elseif($numDiaSemana < $startDayWeek)
			{
				$numControle = $startDayWeek - $numDiaSemana;
				$diaInicioSemanaMes = self::DateFromTimestamp(strtotime("+$numControle day", DateUtil::TimeStampFromStr($date, $dateFormat)));	
			}else
			{
				$diaInicioSemanaMes = $date;
			}				
			return $diaInicioSemanaMes;
		}
	}
}
?>