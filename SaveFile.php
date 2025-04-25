<?php
require_once("SaveEnum.php");

interface ISaveFile {
  public function saveJson($data);
  public function saveCsv($data);
}

class SaveFile implements ISaveFile {
  private string $folder = __DIR__ . '/storage';

  public function __construct()
  {
    // Ensure the storage folder exists and is writable
    if (!is_dir($this->folder)) {
      mkdir($this->folder, 0755, true);
    }

    if (!is_writable($this->folder)) {
      throw new RuntimeException("The folder '{$this->folder}' is not writable.");
    }
  }

  public function saveJson($data): void
  {
    $file = $this->folder . '/' . time() . '_data.json';
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    if (file_put_contents($file, $jsonData) === false) {
      throw new RuntimeException("Failed to write JSON data to '{$file}'.");
    }
  }

  public function saveCsv($data): void
  {
    $file = $this->folder . '/' . time() . '_data.json';
    $fp = fopen($file, 'w');

    if (!$fp) {
      throw new RuntimeException("Failed to open file for writing: '{$file}'.");
    }

    fputcsv($fp, array_keys($data[0])); // Write header
    foreach ($data as $row) {
      fputcsv($fp, $row);
    }
    fclose($fp);
  }
}
