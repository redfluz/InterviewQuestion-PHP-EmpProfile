<?php
namespace Interface;
interface ISaveFile {
    public function saveJson($data);
    public function saveCsv($data);
}