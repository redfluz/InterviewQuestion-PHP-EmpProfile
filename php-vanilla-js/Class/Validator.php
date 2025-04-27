<?php
namespace Class;
use Exception;

class Validator
{
  /**
   * @throws Exception
   */
  public static function ValidateString(string $parameter, int $minLength, int $maxLength, $required = false): string
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $value = $data[$parameter];
    $value = strip_tags($value);
    $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

    if ($required && $value === '') {
      throw new Exception("$parameter cannot be empty.");
    }

    $length = strlen($value);
    if ($length < $minLength) {
      throw new Exception("Minimum length for $parameter is $minLength.");
    }

    if ($length > $maxLength) {
      throw new Exception("Maximum length for $parameter is $maxLength.");
    }

    return $value;
  }

  /**
   * @throws Exception
   */
  public static function ValidateNumber(string $parameter, float $min, float $max, string $type = 'float'): float|int
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $valueRaw = $data[$parameter];
    if(empty($valueRaw)){
      return "";
    }

    $value = match ($type) {
      'int' => filter_var($valueRaw, FILTER_VALIDATE_INT),
      'float' => filter_var($valueRaw, FILTER_VALIDATE_FLOAT),
      default => throw new Exception("Unsupported number type '$type'.")
    };

    if ($value === false) {
      throw new Exception("$parameter must be a valid $type.");
    }

    if ($value < $min || $value > $max) {
      throw new Exception("$parameter must be between $min and $max.");
    }

    return $value;
  }

  /**
   * @throws Exception
   */
  public static function ValidateEmail(string $parameter, int $minLength = 5, int $maxLength = 255): string
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $value = $data[$parameter];
    if (strlen($value) == 0) {
      return "";
    }
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
      throw new Exception("$parameter must be a valid email address.");
    }

    $length = strlen($value);
    if ($length < $minLength) {
      throw new Exception("Email is too short.");
    }

    if ($length > $maxLength) {
      throw new Exception("Email is too long.");
    }

    return $value;
  }

  /**
   * @throws Exception
   */
  public static function ValidatePhone(string $parameter, int $minLength = 8, int $maxLength = 20): string
  {

    $data = json_decode(file_get_contents('php://input'), true);
    $value = $data[$parameter];

    if (empty($value)) {
      return "";
    }
    // Remove non-digits for checking
    $digits = preg_replace('/\D/', '', $value);

    if (strlen($digits) < $minLength || strlen($digits) > $maxLength) {
      throw new Exception("$parameter must be between $minLength and $maxLength digits.");
    }

    // Optional: check valid phone format
    if (!preg_match('/^[0-9\-\+\(\)\s]+$/', $value)) {
      throw new Exception("$parameter contains invalid characters.");
    }

    return $value;
  }

  /**
   * @throws Exception
   */
  public static function ValidateDate(string $parameter, string $format = 'Y-m-d'): string
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $value = $data[$parameter];

    if (empty($value)) {
      return "";
    }

    $date = \DateTime::createFromFormat($format, trim($value));

    // Validate format and actual date
    if (!$date || $date->format($format) !== $value) {
      throw new Exception("$parameter must be a valid date in format $format.");
    }

    return $value;
  }
}
