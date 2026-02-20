<?php
// 1. Get the number from the URL parameter '?number='
$targetNumber = isset($_GET['number']) ? $_GET['number'] : '';

// Simple validation to ensure the number isn't empty
if (empty($targetNumber)) {
    die(json_encode(["status" => "error", "message" => "Please provide a number: ?number=013..."]));
}

// 2. The API Endpoint
$url = 'https://weblogin.grameenphone.com/backend/api/v1/otp';

// 3. Setup the Headers (Exactly as per your Curl)
$headers = [
    'User-Agent: Mozilla/5.0 (Linux; Android 13; V2037 Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.132 Mobile Safari/537.36',
    'Accept: application/json, text/plain, */*',
    'Accept-Encoding: gzip, deflate, br, zstd',
    'Content-Type: application/json',
    'sec-ch-ua-platform: "Android"',
    'sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Android WebView";v="144"',
    'sec-ch-ua-mobile: ?1',
    'Origin: https://weblogin.grameenphone.com',
    'X-Requested-With: mark.via.gp',
    'Sec-Fetch-Site: same-origin',
    'Sec-Fetch-Mode: cors',
    'Sec-Fetch-Dest: empty',
    'Referer: https://weblogin.grameenphone.com/',
    'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8'
];

// 4. Prepare the JSON data
$data = json_encode(['msisdn' => $targetNumber]);

// 5. Execute cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_ENCODING, ""); // Handles gzip/deflate automatically
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Skip SSL check if testing on localhost

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

// 6. Output the response
if ($err) {
    echo "cURL Error: " . $err;
} else {
    header('Content-Type: application/json');
    echo $response;
}
?>
