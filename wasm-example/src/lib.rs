use lindera::tokenizer::Tokenizer;
use lindera_core::core::viterbi::Mode;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn tokenize(x: Option<String>) -> Vec<String> {
    let mut tokenizer = Tokenizer::new(Mode::Normal, "");
    tokenizer
        .tokenize(&x.unwrap())
        .iter()
        .map(|x| x.text.into())
        .collect::<Vec<String>>()
}
