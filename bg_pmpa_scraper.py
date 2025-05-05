import os
import time
import fitz  # PyMuPDF para extrair texto dos PDFs
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime
from telegram import Bot

# Configurações do site da PMPA
URL_LOGIN = "https://www.pm.pa.gov.br/bg-e-adit/category/2009-fevereiro.html"
BASE_URL = "https://www.pm.pa.gov.br"
DOWNLOAD_DIR = "boletins_fevereiro_2025"  # Pasta onde os PDFs de fevereiro de 2025 serão salvos

# Configuração do Telegram
TELEGRAM_BOT_TOKEN = "7632076736:AAG96VLb3y2bF6GnuaCj6vxUMb6Z-YOrppw"
TELEGRAM_CHAT_ID = "666962348"

bot = Bot(token=TELEGRAM_BOT_TOKEN)

# Criar pasta se não existir
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)

def verificar_boletins():
    print(f"[{datetime.now()}] Acessando o site...")
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Rodar sem abrir o navegador
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(URL_LOGIN)
    time.sleep(3)

    # Capturar os links dos PDFs
    print(f"[{datetime.now()}] Obtendo a lista de boletins...")
    soup = BeautifulSoup(driver.page_source, "html.parser")
    pdf_links = [a["href"] for a in soup.find_all("a") if a.has_attr("href") and a["href"].endswith(".pdf")]
    driver.quit()

    if not pdf_links:
        print("Nenhum boletim encontrado. Verifique se o site mudou.")
        return False

    print(f"[{datetime.now()}] Encontrados {len(pdf_links)} boletins. Baixando...")

    for link in pdf_links:
        if not link.startswith("http"):
            link = BASE_URL + link  # Corrige URLs incompletas
        filename = os.path.join(DOWNLOAD_DIR, link.split("/")[-1])
        if not os.path.exists(filename):
            response = requests.get(link, stream=True)
            with open(filename, "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"[{datetime.now()}] Baixado: {filename}")
            
            # Enviar PDF via Telegram
            with open(filename, "rb") as pdf_file:
                bot.send_document(chat_id=666962348, document=pdf_file, caption="📄 Novo boletim disponível!")

    print(f"[{datetime.now()}] Verificação concluída.")
    return True

def iniciar_monitoramento(intervalo_minutos=5, horario_inicio=18, horario_fim=1):
    while True:
        agora = datetime.now()
        if (agora.weekday() < 5 and (horario_inicio <= agora.hour or agora.hour < horario_fim)):
            if verificar_boletins():
                print(f"[{datetime.now()}] Boletim encontrado. Cancelando monitoramento até o próximo ciclo.")
                break  # Interrompe o monitoramento até o próximo dia útil
        else:
            print(f"[{datetime.now()}] Fora do horário de monitoramento. Aguardando...")
        time.sleep(intervalo_minutos * 60)

# Iniciar monitoramento automático a partir das 18h até 01h, verificando a cada 5 minutos
if __name__ == "__main__":
    iniciar_monitoramento(intervalo_minutos=5, horario_inicio=18, horario_fim=1)
