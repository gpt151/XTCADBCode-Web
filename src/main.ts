import { getCode } from './adbcode.js';
import './style.css';

type Mode = 'adb' | 'zj';

class ADBCalculator {
  private codeInput!: HTMLInputElement;
  private calculateBtn!: HTMLButtonElement;
  private modeButtons!: NodeListOf<HTMLButtonElement>;
  private resultContainer!: HTMLDivElement;
  private resultTitle!: HTMLDivElement;
  private resultValue!: HTMLDivElement;
  private currentMode: Mode = 'adb';

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements(): void {
    this.codeInput = document.getElementById('codeInput') as HTMLInputElement;
    this.calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    this.modeButtons = document.querySelectorAll('.mode-button');
    this.resultContainer = document.getElementById('resultContainer') as HTMLDivElement;
    this.resultTitle = document.getElementById('resultTitle') as HTMLDivElement;
    this.resultValue = document.getElementById('resultValue') as HTMLDivElement;
  }

  private attachEventListeners(): void {
    this.calculateBtn.addEventListener('click', () => this.calculate());
    this.codeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.calculate();
      }
    });

    this.modeButtons.forEach(button => {
      button.addEventListener('click', () => this.setMode(button.dataset.mode as Mode));
    });
  }

  private setMode(mode: Mode): void {
    this.currentMode = mode;
    this.modeButtons.forEach(button => {
      if (button.dataset.mode === mode) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  private calculate(): void {
    const code = this.codeInput.value.trim();
    
    if (!code) {
      this.showError('请输入校验码');
      return;
    }

    if (!/^\d+$/.test(code)) {
      this.showError('校验码必须为数字');
      return;
    }

    const result = getCode(code, this.currentMode);

    if (result === '') {
      this.showError('计算失败，请检查输入格式');
    } else {
      this.showSuccess(result);
    }
  }

  private showError(message: string): void {
    this.resultContainer.className = 'result-container result-error';
    this.resultTitle.textContent = '错误';
    this.resultValue.textContent = message;
    this.resultContainer.classList.remove('hidden');
  }

  private showSuccess(result: string): void {
    this.resultContainer.className = 'result-container result-success';
    this.resultTitle.textContent = '计算结果';
    this.resultValue.textContent = result;
    this.resultContainer.classList.remove('hidden');
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  new ADBCalculator();
});
