// Button Product
interface Button {
  render(): void;
}

// Checkbox Product
interface Checkbox {
  toggle(): void;
}

// Windows Products
class WindowsButton implements Button {
  render(): void {
    console.log("Windows stilinde bir buton çizildi.");
  }
}

class WindowsCheckbox implements Checkbox {
  toggle(): void {
    console.log("Windows stilinde checkbox işaretlendi/kaldırıldı.");
  }
}

// Mac Products
class MacButton implements Button {
  render(): void {
    console.log("Mac stilinde bir buton çizildi.");
  }
}

class MacCheckbox implements Checkbox {
  toggle(): void {
    console.log("Mac stilinde checkbox işaretlendi/kaldırıldı.");
  }
}

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacUIFactory implements UIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

function main() {
  const windowsUIFactory = new WindowsUIFactory();
  const macUIFactory = new MacUIFactory();

  const windowsButton = windowsUIFactory.createButton();
  const windowsCheckbox = windowsUIFactory.createCheckbox();
  const macButton = macUIFactory.createButton();
  const macCheckbox = macUIFactory.createCheckbox();

  windowsButton.render();
  windowsCheckbox.toggle();
  macButton.render();
  macCheckbox.toggle();
}

main();
