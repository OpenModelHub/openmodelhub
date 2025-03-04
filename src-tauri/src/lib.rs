// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri_plugin_http::reqwest;
use tauri::ipc::Channel;

#[tauri::command]
async fn fetch_post_stream(uri: String, body: String, on_event: Channel<tauri::ipc::InvokeResponseBody>) -> Result<(), String> {
  let client = reqwest::Client::new();
  let mut response = client.post(uri)
  .body(body)
  .header("Content-Type", "application/json")
  .header("Transfer-Encoding", "chunked")
  .send()
  .await
  .map_err(|err| err.to_string())?;

  while let Some(chunk) = response.chunk().await.map_err(|err| err.to_string())? {
    on_event.send(tauri::ipc::InvokeResponseBody::Raw(chunk.to_vec())).map_err(|err| err.to_string())?;
  }

  on_event.send(tauri::ipc::InvokeResponseBody::Raw(Vec::new())).map_err(|err| err.to_string())?;

  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_http::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![fetch_post_stream])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
