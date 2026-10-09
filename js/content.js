export const TOPICS = {
  scripting: { label: "Shell scripting", book: "bash-basics" },
  parameters: { label: "Arguments and variables", book: "parameters" },
  conditions: { label: "Conditions and exit status", book: "conditions" },
  loops: { label: "Loops", book: "loops" },
  editors: { label: "Editors and permissions", book: "permissions" },
  hardware: { label: "Computer hardware", book: "hardware" },
  devices: { label: "Devices and buses", book: "devices" },
  storage: { label: "Storage and partitions", book: "storage" },
  modules: { label: "Kernel modules", book: "modules" },
  inspection: { label: "System inspection commands", book: "inspection" }
};

const CASES = [
  { host: "lab-alpha", file: "audit.sh", dir: "/tmp/cache", arg: "report.txt", n: 6, disk: "sda3", module: "loop", animal: "penguin" },
  { host: "lab-bravo", file: "backup.sh", dir: "/var/backups", arg: "notes.md", n: 8, disk: "sda4", module: "snd", animal: "falcon" },
  { host: "lab-charlie", file: "check.sh", dir: "/home/student", arg: "data.csv", n: 5, disk: "sdb2", module: "vfat", animal: "tiger" },
  { host: "lab-delta", file: "deploy.sh", dir: "/opt/app", arg: "config.ini", n: 7, disk: "sdc1", module: "bridge", animal: "wolf" },
  { host: "lab-echo", file: "health.sh", dir: "/srv/web", arg: "access.log", n: 9, disk: "sdb5", module: "overlay", animal: "eagle" },
  { host: "lab-foxtrot", file: "inventory.sh", dir: "/mnt/archive", arg: "items.txt", n: 4, disk: "sdc2", module: "dummy", animal: "lynx" },
  { host: "lab-golf", file: "monitor.sh", dir: "/run/service", arg: "status.json", n: 11, disk: "sdd1", module: "tun", animal: "otter" },
  { host: "lab-hotel", file: "report.sh", dir: "/usr/local/bin", arg: "users.txt", n: 12, disk: "sda6", module: "bonding", animal: "panda" },
  { host: "lab-india", file: "rotate.sh", dir: "/var/log/app", arg: "server.log", n: 3, disk: "sdb3", module: "xfs", animal: "raven" },
  { host: "lab-juliet", file: "scan.sh", dir: "/media/usb", arg: "photo.jpg", n: 10, disk: "sdc4", module: "uas", animal: "horse" },
  { host: "lab-kilo", file: "setup.sh", dir: "/etc/profile.d", arg: "course.env", n: 13, disk: "sdd2", module: "nfs", animal: "fox" },
  { host: "lab-lima", file: "sync.sh", dir: "/srv/share", arg: "manifest.yml", n: 14, disk: "sda7", module: "fuse", animal: "bear" },
  { host: "lab-mike", file: "test.sh", dir: "/tmp/session", arg: "input.dat", n: 15, disk: "sdb4", module: "btrfs", animal: "koala" },
  { host: "lab-november", file: "update.sh", dir: "/var/lib/app", arg: "packages.lst", n: 16, disk: "sdc5", module: "raid1", animal: "shark" },
  { host: "lab-oscar", file: "verify.sh", dir: "/home/guest", arg: "answer.txt", n: 17, disk: "sdd3", module: "bluetooth", animal: "camel" },
  { host: "lab-papa", file: "welcome.sh", dir: "/opt/course", arg: "student.txt", n: 18, disk: "sda8", module: "rfkill", animal: "owl" },
  { host: "lab-quebec", file: "cleanup.sh", dir: "/tmp/build", arg: "old.tmp", n: 19, disk: "sdb6", module: "i2c_dev", animal: "deer" },
  { host: "lab-romeo", file: "collect.sh", dir: "/var/tmp/results", arg: "metrics.tsv", n: 20, disk: "sdc6", module: "usb_storage", animal: "dolphin" },
  { host: "lab-sierra", file: "start.sh", dir: "/srv/course", arg: "lesson.md", n: 21, disk: "sdd4", module: "kvm", animal: "rabbit" },
  { host: "lab-tango", file: "summary.sh", dir: "/home/admin", arg: "final.txt", n: 22, disk: "sda9", module: "virtio_net", animal: "lion" }
];

const why = (kk, ru, en) => ({ kk, ru, en });

const CONCEPTS = [
  {
    id: "shell-script", topic: "scripting", difficulty: "foundation",
    question: c => `On ${c.host}, a student saves several Linux commands in ${c.file}. What best describes this file when Bash can execute those commands in sequence?`,
    choices: () => ["A shell script", "A partition table", "A kernel module", "A device node"], answer: "A shell script",
    explanation: why(
      "Shell script — shell орындайтын командалар жазылған мәтіндік файл. Ол компиляцияланған kernel module да, диск кестесі де емес.",
      "Shell script — это текстовый файл с командами, которые последовательно выполняет оболочка. Это не модуль ядра и не таблица разделов.",
      "A shell script is a text file containing commands for a shell to execute in order. It is neither a kernel module nor a partition table."
    )
  },
  {
    id: "shebang", topic: "scripting", difficulty: "foundation",
    question: c => `${c.file} begins with #!/bin/bash. What does this first line tell Linux when the script is launched directly?`,
    choices: () => ["Use /bin/bash as the interpreter", "Create a Bash variable", "Grant execute permission", "Return exit status zero"], answer: "Use /bin/bash as the interpreter",
    explanation: why(
      "#! жолы shebang деп аталады. Ол файлды қай интерпретатор оқитынын көрсетеді. Орындау құқығын бөлек chmod береді.",
      "Строка #! называется shebang и указывает интерпретатор файла. Право на запуск выдаётся отдельно командой chmod.",
      "The #! line is the shebang. It selects the interpreter; execute permission is controlled separately with chmod."
    )
  },
  {
    id: "chmod-x", topic: "editors", difficulty: "foundation",
    question: c => `Which effect does chmod +x ${c.file} have before the student runs ./${c.file}?`,
    choices: c => [`It adds execute permission to ${c.file}`, `It opens ${c.file} in vi`, `It loads ${c.file} into the kernel`, `It makes ${c.file} read-only`], answer: c => `It adds execute permission to ${c.file}`,
    explanation: why(
      "+x файлға execute битін қосады. Ол файлды өзгертпейді және редакторды ашпайды.",
      "+x добавляет файлу бит выполнения. Команда не редактирует файл и не загружает его в ядро.",
      "+x adds the execute bit. It does not edit the file or load it into the kernel."
    )
  },
  {
    id: "positional-one", topic: "parameters", difficulty: "foundation",
    question: c => `The command ./${c.file} ${c.arg} is executed. What value does $1 contain inside the script?`,
    choices: c => [c.arg, `./${c.file}`, "1", "The previous exit status"], answer: c => c.arg,
    explanation: why(
      "$1 — скриптке берілген бірінші позициялық аргумент. Скрипт атауы $0-де, ал алдыңғы exit status $? ішінде сақталады.",
      "$1 — первый позиционный аргумент скрипта. Имя скрипта хранится в $0, а код завершения предыдущей команды — в $?.",
      "$1 is the first positional argument. The script name is in $0, while $? holds the previous command's exit status."
    )
  },
  {
    id: "argument-count", topic: "parameters", difficulty: "foundation",
    question: c => `A script on ${c.host} must print how many command-line arguments it received. Which Bash special parameter should it echo?`,
    choices: () => ["$#", "$?", "$$", "$0"], answer: "$#",
    explanation: why(
      "$# — позициялық аргументтер саны. $? — соңғы команданың коды, $$ — shell PID, $0 — скрипт атауы.",
      "$# содержит количество позиционных аргументов. $? — код последней команды, $$ — PID оболочки, $0 — имя скрипта.",
      "$# contains the number of positional arguments. $? is the last status, $$ is the shell PID, and $0 is the script name."
    )
  },
  {
    id: "exit-status", topic: "conditions", difficulty: "foundation",
    question: c => `After ${c.file} runs a command successfully, which conventional exit status should that command return?`,
    choices: () => ["0", "1", "127", "255"], answer: "0",
    explanation: why(
      "Unix тәрізді жүйелерде 0 — сәтті орындалу, нөлден өзге мән — қате немесе ерекше жағдай.",
      "В Unix-подобных системах 0 означает успех, а ненулевое значение — ошибку или особое состояние.",
      "On Unix-like systems, zero means success; a non-zero status indicates failure or another condition."
    )
  },
  {
    id: "if-zero", topic: "conditions", difficulty: "foundation",
    question: c => `In ${c.file}, when will the commands after then run in an if statement?`,
    choices: () => ["When the tested command returns 0", "When it returns 1", "Only when root runs the script", "Whenever an else block exists"], answer: "When the tested command returns 0",
    explanation: why(
      "Bash if логикалық true мәнін exit status 0 ретінде түсінеді. Нөлден өзге код false болады.",
      "Bash считает exit status 0 истинным условием. Ненулевой код считается ложным.",
      "Bash treats exit status 0 as true. A non-zero status makes the condition false."
    )
  },
  {
    id: "directory-test", topic: "conditions", difficulty: "application",
    question: c => `Which Bash expression correctly tests whether ${c.dir} exists and is a directory?`,
    choices: c => [`[ -d ${c.dir} ]`, `[ -f ${c.dir} ]`, `[ -x ${c.dir} ]`, `[ -eq ${c.dir} ]`], answer: c => `[ -d ${c.dir} ]`,
    explanation: why(
      "-d жолдың каталог екенін тексереді. -f кәдімгі файлды, -x орындау рұқсатын тексереді; -eq сандарды салыстырады.",
      "-d проверяет каталог. -f проверяет обычный файл, -x — право выполнения, а -eq сравнивает числа.",
      "-d tests for a directory. -f tests a regular file, -x tests executability, and -eq compares integers."
    )
  },
  {
    id: "variable-expansion", topic: "parameters", difficulty: "application",
    question: c => `What is printed by ANIMAL="${c.animal}" followed by echo "My favorite animal is $ANIMAL"?`,
    choices: c => [`My favorite animal is ${c.animal}`, "My favorite animal is $ANIMAL", `ANIMAL=${c.animal}`, "My favorite animal is ANIMAL"], answer: c => `My favorite animal is ${c.animal}`,
    explanation: why(
      "Қос тырнақша ішінде $ANIMAL айнымалы мәніне айналады. Жалғыз тырнақша қолданылса, $ANIMAL мәтін ретінде қалар еді.",
      "В двойных кавычках $ANIMAL раскрывается в значение переменной. В одинарных кавычках текст остался бы без подстановки.",
      "Inside double quotes, $ANIMAL expands to its value. Single quotes would preserve the literal text."
    )
  },
  {
    id: "loop-count", topic: "loops", difficulty: "application",
    question: c => `How many values are printed by for ((i=0; i<${c.n}; i++)); do echo $i; done?`,
    choices: c => [String(c.n), String(c.n - 1), String(c.n + 1), "Infinitely many"], answer: c => String(c.n),
    explanation: why(
      c => `Цикл 0-ден басталып, i < ${c.n} болғанда жұмыс істейді. Сондықтан 0...${c.n - 1} мәндері, барлығы ${c.n} рет шығады.`,
      c => `Цикл начинается с 0 и выполняется, пока i < ${c.n}. Он печатает 0...${c.n - 1}, всего ${c.n} значений.`,
      c => `The loop starts at 0 and runs while i < ${c.n}. It prints 0 through ${c.n - 1}, which is ${c.n} values.`
    )
  },
  {
    id: "vi-insert", topic: "editors", difficulty: "foundation",
    question: c => `While editing ${c.file} in vi, which key switches from normal mode to insert mode?`,
    choices: () => ["i", "Esc", "q", "u"], answer: "i",
    explanation: why(
      "vi normal mode режимінде i пернесі insert mode ашады. Esc қайта normal mode-қа әкеледі.",
      "В vi клавиша i переходит из normal mode в insert mode. Esc возвращает в normal mode.",
      "In vi, i enters insert mode from normal mode. Esc returns to normal mode."
    )
  },
  {
    id: "dev-directory", topic: "devices", difficulty: "foundation",
    question: c => `An administrator on ${c.host} wants to inspect Linux device nodes. Which directory should be checked first?`,
    choices: () => ["/dev", "/etc", "/home", "/var"], answer: "/dev",
    explanation: why(
      "/dev ішінде құрылғыларды білдіретін арнайы файлдар орналасады. /etc — конфигурация, /home — пайдаланушы файлдары, /var — өзгермелі деректер.",
      "В /dev находятся специальные файлы устройств. /etc хранит конфигурацию, /home — пользовательские файлы, /var — изменяемые данные.",
      "/dev contains device nodes. /etc stores configuration, /home stores user files, and /var stores variable data."
    )
  },
  {
    id: "arch-command", topic: "inspection", difficulty: "foundation",
    question: c => `Which command gives a short machine architecture name such as x86_64 on ${c.host}?`,
    choices: () => ["arch", "free", "lsusb", "fdisk"], answer: "arch",
    explanation: why(
      "arch қысқа architecture атауын шығарады, мысалы x86_64. Толық CPU мәліметі үшін lscpu қолданылады.",
      "arch выводит краткое имя архитектуры, например x86_64. Для подробной информации используется lscpu.",
      "arch prints a short architecture name such as x86_64. Use lscpu for detailed CPU information."
    )
  },
  {
    id: "lscpu", topic: "inspection", difficulty: "foundation",
    question: c => `A technician needs CPU family, model, cores, threads, and architecture details from ${c.host}. Which command is most suitable?`,
    choices: () => ["lscpu", "lsusb", "free -m", "lsmod"], answer: "lscpu",
    explanation: why(
      "lscpu CPU architecture, family, model, core және thread мәліметтерін жинайды.",
      "lscpu выводит архитектуру, семейство, модель, ядра и потоки процессора.",
      "lscpu reports CPU architecture, family, model, cores, threads, and related topology."
    )
  },
  {
    id: "free-m", topic: "inspection", difficulty: "foundation",
    question: c => `Which command displays RAM and swap usage in megabyte units on ${c.host}?`,
    choices: () => ["free -m", "lscpu -m", "lsmod -m", "fdisk -m"], answer: "free -m",
    explanation: why(
      "free memory және swap статистикасын көрсетеді; -m нәтижені MiB шамасында береді.",
      "free показывает память и swap; ключ -m выводит значения в единицах около мегабайта.",
      "free reports memory and swap statistics; -m displays values in units close to MiB."
    )
  },
  {
    id: "lsusb", topic: "devices", difficulty: "foundation",
    question: c => `A USB storage device is connected to ${c.host}. Which command lists devices detected on USB buses?`,
    choices: () => ["lsusb", "lspci", "lsmod", "lscpu"], answer: "lsusb",
    explanation: why(
      "lsusb USB шиналарын және соларға қосылған құрылғыларды көрсетеді.",
      "lsusb перечисляет USB-шины и подключённые к ним устройства.",
      "lsusb lists USB buses and the devices attached to them."
    )
  },
  {
    id: "lspci", topic: "devices", difficulty: "foundation",
    question: c => `Which command lists devices attached through the PCI bus on ${c.host}?`,
    choices: () => ["lspci", "lsusb", "free", "arch"], answer: "lspci",
    explanation: why(
      "lspci PCI шиналарындағы құрылғыларды, мысалы network және graphics controller-лерді көрсетеді.",
      "lspci показывает устройства на шине PCI, например сетевые и графические контроллеры.",
      "lspci lists PCI devices such as network and graphics controllers."
    )
  },
  {
    id: "lspci-k", topic: "devices", difficulty: "application",
    question: c => `What extra information is requested by running lspci -k instead of plain lspci on ${c.host}?`,
    choices: () => ["Kernel drivers and modules associated with devices", "RAM and swap usage", "Partition sizes", "Shell variables"], answer: "Kernel drivers and modules associated with devices",
    explanation: why(
      "lspci -k құрылғымен байланысқан kernel driver мен kernel module ақпаратын қосады.",
      "lspci -k дополнительно показывает драйвер ядра и модули, связанные с устройством.",
      "lspci -k adds the kernel driver in use and related kernel modules for PCI devices."
    )
  },
  {
    id: "lsmod", topic: "modules", difficulty: "foundation",
    question: c => `Before changing drivers on ${c.host}, which statement describes the output of lsmod?`,
    choices: () => ["It lists currently loaded kernel modules", "It lists mounted filesystems", "It lists logged-in users", "It lists available Bash variables"], answer: "It lists currently loaded kernel modules",
    explanation: why(
      "lsmod /proc/modules мазмұнын оқып, жүктелген kernel module-дерді көрсетеді.",
      "lsmod форматирует /proc/modules и показывает загруженные модули ядра.",
      "lsmod formats /proc/modules and shows the kernel modules currently loaded."
    )
  },
  {
    id: "modprobe", topic: "modules", difficulty: "application",
    question: c => `Which command should load the ${c.module} kernel module and automatically handle its declared dependencies?`,
    choices: c => [`modprobe ${c.module}`, `lsmod ${c.module}`, `lspci ${c.module}`, `fdisk ${c.module}`], answer: c => `modprobe ${c.module}`,
    explanation: why(
      "modprobe module-ді жүктейді және modules.dep дерегі арқылы тәуелділіктерін автоматты өңдейді. lsmod тек тізімді көрсетеді.",
      "modprobe загружает модуль и автоматически обрабатывает зависимости через базу modules.dep. lsmod только показывает список.",
      "modprobe loads a module and resolves dependencies using the modules.dep database. lsmod only displays loaded modules."
    )
  },
  {
    id: "fdisk-list", topic: "storage", difficulty: "foundation",
    question: c => `What is the non-interactive purpose of sudo fdisk -l on ${c.host}?`,
    choices: () => ["List recognized partition tables", "Delete every partition", "Format all drives", "Load a disk driver"], answer: "List recognized partition tables",
    explanation: why(
      "fdisk -l бөлім кестелерін тізімдейді және шығады. Бөлімдерді өзгерту үшін device-пен интерактивті fdisk қажет.",
      "fdisk -l выводит таблицы разделов и завершает работу. Изменение разделов выполняется в интерактивном режиме для конкретного устройства.",
      "fdisk -l lists partition tables and exits. Editing requires an interactive fdisk session for a specific device."
    )
  },
  {
    id: "sd-partition", topic: "storage", difficulty: "application",
    question: c => `In the device path /dev/${c.disk}, what does the trailing number identify?`,
    choices: c => ["A partition number on the named disk", "A SATA controller number", "A kernel module version", "A mounted directory number"], answer: "A partition number on the named disk",
    explanation: why(
      c => `sdX дискіні білдіреді, ал соңғы сан сол дисктегі бөлімді білдіреді. Мысалы /dev/${c.disk} — ${c.disk.slice(-1)}-бөлім.`,
      c => `sdX обозначает диск, а конечная цифра — номер раздела на нём. Например, /dev/${c.disk} — раздел ${c.disk.slice(-1)}.`,
      c => `sdX names a disk, and the trailing number selects a partition on it. For example, /dev/${c.disk} is partition ${c.disk.slice(-1)}.`
    )
  },
  {
    id: "unmount", topic: "storage", difficulty: "application",
    question: c => `A filesystem from a USB drive is mounted at ${c.dir}. What should be done before physically disconnecting the drive?`,
    choices: c => [`Unmount ${c.dir}`, "Delete its /dev node", "Disable all kernel modules", "Run lscpu"], answer: c => `Unmount ${c.dir}`,
    explanation: why(
      "Құрылғыны ажыратпас бұрын umount арқылы filesystem-ді ажырату керек. Бұл буферленген жазулардың аяқталуына мүмкіндік береді.",
      "Перед отключением устройства файловую систему нужно размонтировать через umount, чтобы завершились отложенные операции записи.",
      "Unmount the filesystem before disconnecting the device so buffered writes can complete safely."
    )
  },
  {
    id: "motherboard", topic: "hardware", difficulty: "foundation",
    question: c => `During a hardware check of ${c.host}, what is identified as the motherboard's primary system role?`,
    choices: () => ["Connecting the main hardware components", "Storing user files permanently", "Converting AC power to DC power", "Providing swap space"], answer: "Connecting the main hardware components",
    explanation: why(
      "Motherboard CPU, RAM, storage controller және expansion device-терді өзара байланыстырады. Қуатты PSU түрлендіреді.",
      "Материнская плата соединяет процессор, память, контроллеры накопителей и платы расширения. Электропитание преобразует блок питания.",
      "The motherboard interconnects the CPU, memory, storage controllers, and expansion devices. The power supply converts electrical power."
    )
  },
  {
    id: "x86-memory", topic: "hardware", difficulty: "foundation",
    question: c => `Why is an x86_64 operating environment on ${c.host} able to support far more memory than a 32-bit x86 environment?`,
    choices: () => ["It has a much larger address space", "It eliminates storage devices", "It does not need a motherboard", "It cannot execute 32-bit code"], answer: "It has a much larger address space",
    explanation: why(
      "64-bit address кеңістігі 32-bit кеңістіктен әлдеқайда үлкен, сондықтан көбірек memory address қолжетімді.",
      "64-битное адресное пространство намного больше 32-битного, поэтому можно адресовать значительно больше памяти.",
      "A 64-bit address space is vastly larger than a 32-bit address space, allowing far more memory to be addressed."
    )
  }
];

// Five genuinely different exam formulations per skill. Variants rotate through
// these formulations and use different data, while the skill identifier remains
// stable so analytics can still detect a repeated weakness.
const PROMPT_VARIANTS = {
  "shell-script": [
    c => `On ${c.host}, a student saves several Linux commands in ${c.file}. What best describes this file when Bash can execute those commands in sequence?`,
    c => `An administrator wants the commands used on ${c.host} to be repeatable and stores them as plain text in ${c.file}. What kind of file is being created?`,
    c => `${c.file} contains echo, test, and for commands and is read by Bash from top to bottom. Which term identifies ${c.file}?`,
    c => `A teammate says ${c.file} must be compiled before Bash can use it. Which classification shows why that statement is wrong?`,
    c => `Which description fits ${c.file} if it automates a routine on ${c.host} by combining shell commands in one text file?`
  ],
  shebang: [
    c => `${c.file} begins with #!/bin/bash. What does this first line tell Linux when the script is launched directly?`,
    c => `Linux launches ./${c.file} directly. Which purpose is served by the #!/bin/bash line at the top?`,
    c => `A script on ${c.host} must always be interpreted by Bash rather than another shell. Which effect does #!/bin/bash provide?`,
    c => `The first two characters of ${c.file} are #!. What information is supplied by the complete line #!/bin/bash?`,
    c => `Why can the operating system select Bash for ${c.file} when the file starts with #!/bin/bash?`
  ],
  "chmod-x": [
    c => `Which effect does chmod +x ${c.file} have before the student runs ./${c.file}?`,
    c => `${c.file} gives “Permission denied” when launched directly. What change is made by chmod +x ${c.file}?`,
    c => `After editing ${c.file}, a student runs chmod +x on it. Which file permission has been added?`,
    c => `What does the +x portion specifically request in chmod +x ${c.file}?`,
    c => `On ${c.host}, which statement correctly describes the result of chmod +x ${c.file}?`
  ],
  "positional-one": [
    c => `The command ./${c.file} ${c.arg} is executed. What value does $1 contain inside the script?`,
    c => `${c.file} reads INPUT=$1 after being called as ./${c.file} ${c.arg}. What is assigned to INPUT?`,
    c => `Inside ${c.file}, echo "$1" runs after the command ./${c.file} ${c.arg}. What is printed?`,
    c => `A Bash script receives ${c.arg} immediately after its filename on the command line. Which value is represented by $1?`,
    c => `When ./${c.file} ${c.arg} starts on ${c.host}, which command-line item becomes the first positional parameter?`
  ],
  "argument-count": [
    c => `A script on ${c.host} must print how many command-line arguments it received. Which Bash special parameter should it echo?`,
    c => `${c.file} needs to reject calls with the wrong number of arguments. Which special parameter supplies that count?`,
    c => `Which Bash parameter would ${c.file} compare with 2 to require exactly two arguments?`,
    c => `A diagnostic line must display the positional-argument count for ${c.file}. What should appear after echo?`,
    c => `Which special parameter changes when more arguments are added after ./${c.file} on ${c.host}?`
  ],
  "exit-status": [
    c => `After ${c.file} runs a command successfully, which conventional exit status should that command return?`,
    c => `${c.file} finishes without an error on ${c.host}. Which value should echo $? normally show immediately afterward?`,
    c => `A command used by ${c.file} reports success to Bash. Which numeric status represents that result?`,
    c => `Which exit code lets a following && command run after ${c.file} completes successfully?`,
    c => `The operating system records a successful completion for ${c.file}. What conventional status value is stored?`
  ],
  "if-zero": [
    c => `In ${c.file}, when will the commands after then run in an if statement?`,
    c => `${c.file} contains if command; then echo OK; fi. Which result from command causes OK to print?`,
    c => `Bash evaluates a program directly as the condition of an if block on ${c.host}. Which exit status is treated as true?`,
    c => `A test inside ${c.file} succeeds. What must its status be for the then branch to execute?`,
    c => `Which rule explains when Bash enters the then section of an if statement in ${c.file}?`
  ],
  "directory-test": [
    c => `Which Bash expression correctly tests whether ${c.dir} exists and is a directory?`,
    c => `${c.file} should continue only when ${c.dir} is a directory. Which test belongs in its if condition?`,
    c => `An administrator must distinguish the directory ${c.dir} from a regular file. Which unary test operator is correct?`,
    c => `Complete this check in ${c.file}: if [ ___ ${c.dir} ]; then echo directory; fi. Which flag fills the blank?`,
    c => `Which condition returns success specifically when the path ${c.dir} has directory type?`
  ],
  "variable-expansion": [
    c => `What is printed by ANIMAL="${c.animal}" followed by echo "My favorite animal is $ANIMAL"?`,
    c => `${c.file} sets ANIMAL=${c.animal} and later runs printf '%s' "$ANIMAL". Which text is passed to printf?`,
    c => `In a double-quoted Bash string on ${c.host}, $ANIMAL refers to a variable containing ${c.animal}. What replaces $ANIMAL?`,
    c => `A line reads ANIMAL="${c.animal}". Which output demonstrates variable expansion rather than literal printing?`,
    c => `Why does echo "$ANIMAL" in ${c.file} display ${c.animal} instead of the characters $ANIMAL?`
  ],
  "loop-count": [
    c => `How many values are printed by for ((i=0; i<${c.n}; i++)); do echo $i; done?`,
    c => `A loop in ${c.file} starts at i=0, increments once, and stops before i reaches ${c.n}. How many iterations complete?`,
    c => `What is the output count of seq 0 $(( ${c.n} - 1 )) when it represents the same range as i<${c.n}?`,
    c => `The last value printed by a zero-based loop is ${c.n - 1}. If no value is skipped, how many values were printed?`,
    c => `For ((i=0; i!=${c.n}; i++)), how many times does the body run before the condition becomes false?`
  ],
  "vi-insert": [
    c => `While editing ${c.file} in vi, which key switches from normal mode to insert mode?`,
    c => `vi opens ${c.file} in normal mode. Which single key lets the student begin typing before the cursor?`,
    c => `A student can move the cursor in vi but typed letters act as commands. Which key should enter text-entry mode?`,
    c => `Which vi command changes the editor from normal mode so new text can be inserted into ${c.file}?`,
    c => `Before adding a line to ${c.file} in vi, which key should be pressed to enter insert mode?`
  ],
  "dev-directory": [
    c => `An administrator on ${c.host} wants to inspect Linux device nodes. Which directory should be checked first?`,
    c => `Where does Linux normally expose special files representing disks, terminals, and other devices on ${c.host}?`,
    c => `${c.file} needs the path of a block-device node. Under which top-level directory should it look?`,
    c => `A technician sees entries such as sda, null, and tty. Which directory is being listed?`,
    c => `Which standard directory connects user-space paths with device interfaces on ${c.host}?`
  ],
  "arch-command": [
    c => `Which command gives a short machine architecture name such as x86_64 on ${c.host}?`,
    c => `A script needs only the architecture identifier, not detailed CPU topology. Which command is the shortest match?`,
    c => `Which command can print x86_64 as a concise answer on ${c.host}?`,
    c => `${c.file} must record the hardware architecture in one short value. Which utility should it call?`,
    c => `An administrator wants a brief machine-architecture name before choosing a binary. Which command provides it?`
  ],
  lscpu: [
    c => `A technician needs CPU family, model, cores, threads, and architecture details from ${c.host}. Which command is most suitable?`,
    c => `Which Linux utility summarizes processor topology and data collected from sysfs and /proc/cpuinfo on ${c.host}?`,
    c => `A report requires sockets, cores per socket, threads, and CPU model. Which command should ${c.file} run?`,
    c => `Which command provides substantially more CPU detail than arch on ${c.host}?`,
    c => `To inspect virtualization flags and the processor family on ${c.host}, which utility is appropriate?`
  ],
  "free-m": [
    c => `Which command displays RAM and swap usage in megabyte units on ${c.host}?`,
    c => `${c.file} must report total, used, and available memory using megabyte-scale units. Which command should it execute?`,
    c => `An administrator wants one table containing both physical memory and swap values. Which option is correct?`,
    c => `Which command combines the free utility with a unit flag suitable for an MB-style exam answer?`,
    c => `To compare RAM and swap consumption on ${c.host} without CPU or disk details, which command is used?`
  ],
  lsusb: [
    c => `A USB storage device is connected to ${c.host}. Which command lists devices detected on USB buses?`,
    c => `A newly attached USB keyboard must be identified from the command line. Which utility should be run?`,
    c => `${c.file} needs vendor and product entries from the USB subsystem. Which command supplies them?`,
    c => `Which listing command is specific to Universal Serial Bus devices on ${c.host}?`,
    c => `A technician should verify that Linux detects a flash drive on a USB bus. Which command is the direct choice?`
  ],
  lspci: [
    c => `Which command lists devices attached through the PCI bus on ${c.host}?`,
    c => `A network controller installed on a PCIe slot must be identified. Which command lists it?`,
    c => `${c.file} should inventory graphics and Ethernet controllers on the PCI bus. Which utility fits?`,
    c => `Which command reports PCI device addresses, classes, and vendors on ${c.host}?`,
    c => `To distinguish internal PCI controllers from USB peripherals, which listing command is used?`
  ],
  "lspci-k": [
    c => `What extra information is requested by running lspci -k instead of plain lspci on ${c.host}?`,
    c => `A PCI device is visible, but the technician also needs the kernel driver in use. Which information does -k add?`,
    c => `Why would ${c.file} execute lspci -k while diagnosing a network adapter?`,
    c => `Compared with lspci alone, which driver-related details appear in lspci -k output?`,
    c => `Which result makes lspci -k useful when matching a PCI controller to Linux support?`
  ],
  lsmod: [
    c => `Before changing drivers on ${c.host}, which statement describes the output of lsmod?`,
    c => `A technician wants a snapshot of modules already present in the running kernel. Which description matches lsmod?`,
    c => `${c.file} executes lsmod and reads columns for Module, Size, and Used by. What is being listed?`,
    c => `Which information is formatted from /proc/modules by the lsmod utility?`,
    c => `When lsmod shows ${c.module}, what does that tell the administrator about the current kernel?`
  ],
  modprobe: [
    c => `Which command should load the ${c.module} kernel module and automatically handle its declared dependencies?`,
    c => `${c.module} is not currently loaded on ${c.host}. Which utility should add it together with required modules?`,
    c => `An administrator prefers dependency-aware module loading over inserting a single object directly. Which command is correct?`,
    c => `Which command consults the module dependency database before loading ${c.module}?`,
    c => `${c.file} needs to request kernel support provided by ${c.module}. Which command performs the load?`
  ],
  "fdisk-list": [
    c => `What is the non-interactive purpose of sudo fdisk -l on ${c.host}?`,
    c => `Before editing any disk, a technician runs fdisk -l. Which information is requested?`,
    c => `${c.file} needs an overview of recognized disks and their partition tables. Which fdisk mode supplies it?`,
    c => `What does the lowercase -l option tell fdisk to do without opening an editing session?`,
    c => `Which result should an administrator expect from fdisk -l on ${c.host}?`
  ],
  "sd-partition": [
    c => `In the device path /dev/${c.disk}, what does the trailing number identify?`,
    c => `Linux reports /dev/${c.disk}. How should the final digit in this block-device name be interpreted?`,
    c => `Which storage object is selected by the numbered path /dev/${c.disk}, rather than by its unnumbered disk name?`,
    c => `A mount command refers to /dev/${c.disk}. What role does ${c.disk.slice(-1)} play in that name?`,
    c => `When the disk is named /dev/${c.disk.replace(/[0-9]+$/, "")}, what does /dev/${c.disk} identify?`
  ],
  unmount: [
    c => `A filesystem from a USB drive is mounted at ${c.dir}. What should be done before physically disconnecting the drive?`,
    c => `A student finished copying files to a USB filesystem at ${c.dir}. Which safe step comes before removal?`,
    c => `Which action lets buffered writes finish before the storage mounted on ${c.dir} is unplugged?`,
    c => `${c.host} still shows a USB filesystem mounted at ${c.dir}. What must the administrator do before disconnecting it?`,
    c => `Why should the mount at ${c.dir} be detached through the operating system before removing the device?`
  ],
  motherboard: [
    c => `During a hardware check of ${c.host}, what is identified as the motherboard's primary system role?`,
    c => `Which component provides the main connections among CPU, memory, storage controllers, and expansion devices?`,
    c => `A diagram places one board at the center of communication between the major hardware parts of ${c.host}. What is its role?`,
    c => `Which description separates the motherboard from the power supply and permanent storage?`,
    c => `What system function is performed by the motherboard rather than by RAM or a disk?`
  ],
  "x86-memory": [
    c => `Why is an x86_64 operating environment on ${c.host} able to support far more memory than a 32-bit x86 environment?`,
    c => `Which architectural difference primarily raises the addressable-memory limit when moving from 32-bit x86 to x86_64?`,
    c => `${c.host} is upgraded to a 64-bit operating environment. Why can it map a much larger memory space?`,
    c => `A student claims x86_64 removes the need for storage. Which actual advantage over 32-bit x86 is correct?`,
    c => `What property of 64-bit addressing allows ${c.host} to use substantially more RAM than a 32-bit system?`
  ]
};

function resolve(value, c) {
  return typeof value === "function" ? value(c) : value;
}

function rotateChoices(choices, offset) {
  const shift = offset % choices.length;
  return choices.slice(shift).concat(choices.slice(0, shift));
}

export function buildVariants() {
  return CASES.map((c, variantIndex) => {
    const orderedConcepts = CONCEPTS.map((_, position) =>
      CONCEPTS[(position * 7 + variantIndex * 3) % CONCEPTS.length]
    );
    return ({
    id: variantIndex + 1,
    number: variantIndex + 1,
    title: `Variant ${String(variantIndex + 1).padStart(2, "0")}`,
    questions: orderedConcepts.map((concept, questionIndex) => {
      const answer = resolve(concept.answer, c);
      const choices = rotateChoices(resolve(concept.choices, c), variantIndex + questionIndex);
      const promptOptions = PROMPT_VARIANTS[concept.id];
      const rawPrompt = promptOptions[variantIndex % promptOptions.length](c);
      return {
        id: `v${variantIndex + 1}-${concept.id}`,
        conceptId: concept.id,
        topic: concept.topic,
        difficulty: concept.difficulty,
        question: rawPrompt.includes(c.host) ? rawPrompt : `${rawPrompt} The task is performed on ${c.host}.`,
        choices,
        answer,
        explanation: Object.fromEntries(
          Object.entries(concept.explanation).map(([language, text]) => [language, resolve(text, c)])
        )
      };
    })
  });
  });
}

export const BOOKS = [
  {
    id: "bash-basics", topic: "scripting",
    title: { kk: "Bash script негіздері", ru: "Основы Bash-скриптов", en: "Bash script foundations" },
    body: {
      kk: `<p>Shell script — Bash ретімен орындайтын командалар сақталған мәтіндік файл. Бірінші жолдағы <code>#!/bin/bash</code> интерпретаторды таңдайды, ал <code>chmod +x file.sh</code> файлға орындау құқығын береді.</p><pre>#!/bin/bash\necho "Hello, $USER"</pre><p>Іске қосу: <code>chmod +x hello.sh</code>, кейін <code>./hello.sh</code>.</p>`,
      ru: `<p>Shell script — текстовый файл с командами, которые Bash выполняет по порядку. Первая строка <code>#!/bin/bash</code> выбирает интерпретатор, а <code>chmod +x file.sh</code> добавляет право выполнения.</p><pre>#!/bin/bash\necho "Hello, $USER"</pre><p>Запуск: <code>chmod +x hello.sh</code>, затем <code>./hello.sh</code>.</p>`,
      en: `<p>A shell script is a text file containing commands that Bash executes in order. The first line <code>#!/bin/bash</code> selects the interpreter, while <code>chmod +x file.sh</code> adds execute permission.</p><pre>#!/bin/bash\necho "Hello, $USER"</pre><p>Run <code>chmod +x hello.sh</code>, then <code>./hello.sh</code>.</p>`
    }
  },
  {
    id: "parameters", topic: "parameters",
    title: { kk: "Аргументтер мен айнымалылар", ru: "Аргументы и переменные", en: "Arguments and variables" },
    body: {
      kk: `<p><code>$0</code> — скрипт атауы, <code>$1</code> — бірінші аргумент, <code>$#</code> — аргументтер саны, <code>$?</code> — соңғы exit status, <code>$$</code> — ағымдағы shell PID.</p><pre>./report.sh data.csv\n# $0 = ./report.sh\n# $1 = data.csv\n# $# = 1</pre><p>Қос тырнақша айнымалыны ашады: <code>"$USER"</code>. Жалғыз тырнақша мәтінді өзгеріссіз сақтайды.</p>`,
      ru: `<p><code>$0</code> — имя скрипта, <code>$1</code> — первый аргумент, <code>$#</code> — число аргументов, <code>$?</code> — последний exit status, <code>$$</code> — PID текущей оболочки.</p><pre>./report.sh data.csv\n# $0 = ./report.sh\n# $1 = data.csv\n# $# = 1</pre><p>Двойные кавычки раскрывают переменные: <code>"$USER"</code>. Одинарные сохраняют текст буквально.</p>`,
      en: `<p><code>$0</code> is the script name, <code>$1</code> the first argument, <code>$#</code> the argument count, <code>$?</code> the last status, and <code>$$</code> the shell PID.</p><pre>./report.sh data.csv\n# $0 = ./report.sh\n# $1 = data.csv\n# $# = 1</pre><p>Double quotes expand variables; single quotes preserve literal text.</p>`
    }
  },
  {
    id: "conditions", topic: "conditions",
    title: { kk: "Exit status және шарттар", ru: "Код завершения и условия", en: "Exit status and conditions" },
    body: {
      kk: `<p>Unix жүйесінде <code>0</code> — success. Bash <code>if</code> командасы status 0 болғанда <code>then</code> блогын орындайды.</p><pre>if [ -d /tmp ]; then\n  echo "directory"\nfi</pre><p><code>-d</code> каталогты, <code>-f</code> кәдімгі файлды, <code>-x</code> орындау рұқсатын тексереді. Сандар үшін <code>-eq</code>, <code>-gt</code>, <code>-lt</code> қолданылады.</p>`,
      ru: `<p>В Unix код <code>0</code> означает успех. Bash выполняет блок <code>then</code>, когда проверяемая команда возвращает 0.</p><pre>if [ -d /tmp ]; then\n  echo "directory"\nfi</pre><p><code>-d</code> проверяет каталог, <code>-f</code> обычный файл, <code>-x</code> право выполнения. Для чисел используются <code>-eq</code>, <code>-gt</code>, <code>-lt</code>.</p>`,
      en: `<p>On Unix, status <code>0</code> means success. Bash runs the <code>then</code> block when the tested command returns zero.</p><pre>if [ -d /tmp ]; then\n  echo "directory"\nfi</pre><p><code>-d</code> tests a directory, <code>-f</code> a regular file, and <code>-x</code> executability. Use <code>-eq</code>, <code>-gt</code>, and <code>-lt</code> for integers.</p>`
    }
  },
  {
    id: "loops", topic: "loops",
    title: { kk: "Bash циклдері", ru: "Циклы Bash", en: "Bash loops" },
    body: {
      kk: `<p>Циклдің үш бөлігі бар: бастау, жалғастыру шарты және жаңарту. <code>i=0; i&lt;10; i++</code> 0-ден 9-ға дейін он мән береді.</p><pre>for ((i=0; i&lt;10; i++)); do\n  echo "$i"\ndone</pre><p><code>break</code> циклді тоқтатады, <code>continue</code> келесі итерацияға өтеді.</p>`,
      ru: `<p>У арифметического цикла есть инициализация, условие и обновление. <code>i=0; i&lt;10; i++</code> печатает десять значений от 0 до 9.</p><pre>for ((i=0; i&lt;10; i++)); do\n  echo "$i"\ndone</pre><p><code>break</code> завершает цикл, <code>continue</code> переходит к следующей итерации.</p>`,
      en: `<p>An arithmetic loop has initialization, a continuation test, and an update. <code>i=0; i&lt;10; i++</code> produces ten values, 0 through 9.</p><pre>for ((i=0; i&lt;10; i++)); do\n  echo "$i"\ndone</pre><p><code>break</code> exits a loop; <code>continue</code> advances to the next iteration.</p>`
    }
  },
  {
    id: "permissions", topic: "editors",
    title: { kk: "vi және файл рұқсаттары", ru: "vi и права файлов", en: "vi and file permissions" },
    body: {
      kk: `<p>vi ашылғанда normal mode режимінде болады. <code>i</code> insert mode ашады, <code>Esc</code> normal mode-қа қайтарады, <code>:wq</code> сақтап шығады.</p><p><code>chmod +x script.sh</code> execute битін қосады. Сандық рұқсаттарда read=4, write=2, execute=1.</p><pre>chmod 754 script.sh\n# owner rwx, group r-x, others r--</pre>`,
      ru: `<p>vi открывается в normal mode. <code>i</code> включает insert mode, <code>Esc</code> возвращает normal mode, <code>:wq</code> сохраняет и выходит.</p><p><code>chmod +x script.sh</code> добавляет execute. В числовой записи read=4, write=2, execute=1.</p><pre>chmod 754 script.sh\n# owner rwx, group r-x, others r--</pre>`,
      en: `<p>vi opens in normal mode. <code>i</code> enters insert mode, <code>Esc</code> returns to normal mode, and <code>:wq</code> saves and quits.</p><p><code>chmod +x script.sh</code> adds execute permission. Numeric permissions use read=4, write=2, execute=1.</p><pre>chmod 754 script.sh</pre>`
    }
  },
  {
    id: "hardware", topic: "hardware",
    title: { kk: "Hardware және архитектура", ru: "Оборудование и архитектура", en: "Hardware and architecture" },
    body: {
      kk: `<p>Motherboard CPU, RAM, storage және expansion құрылғыларын байланыстырады. 64-bit архитектура үлкен address space қолданады және 32-bit жүйеден әлдеқайда көп жадты адрестей алады.</p><p><code>arch</code> қысқа атау береді; <code>lscpu</code> family, model, core, thread және cache туралы толық мәлімет көрсетеді.</p>`,
      ru: `<p>Материнская плата соединяет CPU, RAM, накопители и устройства расширения. 64-битная архитектура имеет большее адресное пространство и может адресовать намного больше памяти.</p><p><code>arch</code> даёт краткое имя; <code>lscpu</code> показывает семейство, модель, ядра, потоки и кэши.</p>`,
      en: `<p>The motherboard connects the CPU, RAM, storage, and expansion devices. A 64-bit architecture has a much larger address space than a 32-bit system.</p><p><code>arch</code> prints a short name; <code>lscpu</code> reports family, model, cores, threads, and caches.</p>`
    }
  },
  {
    id: "devices", topic: "devices",
    title: { kk: "Құрылғылар және bus", ru: "Устройства и шины", en: "Devices and buses" },
    body: {
      kk: `<p>Linux құрылғыларды <code>/dev</code> ішіндегі device node арқылы көрсетеді. <code>lsusb</code> USB құрылғыларын, <code>lspci</code> PCI құрылғыларын көрсетеді. <code>lspci -k</code> қолданылатын driver мен module ақпаратын қосады.</p><pre>lsusb\nlspci\nlspci -k</pre>`,
      ru: `<p>Linux представляет устройства узлами в <code>/dev</code>. <code>lsusb</code> показывает USB-устройства, <code>lspci</code> — PCI-устройства. <code>lspci -k</code> дополнительно показывает драйверы и модули.</p><pre>lsusb\nlspci\nlspci -k</pre>`,
      en: `<p>Linux represents devices with nodes in <code>/dev</code>. <code>lsusb</code> lists USB devices, <code>lspci</code> lists PCI devices, and <code>lspci -k</code> adds driver and module information.</p><pre>lsusb\nlspci\nlspci -k</pre>`
    }
  },
  {
    id: "storage", topic: "storage",
    title: { kk: "Дисктер және бөлімдер", ru: "Диски и разделы", en: "Disks and partitions" },
    body: {
      kk: `<p><code>/dev/sda</code> бірінші sd типті диск, <code>/dev/sda1</code> оның бірінші бөлімі, <code>/dev/sda2</code> екінші бөлімі. <code>fdisk -l</code> бөлім кестелерін көрсетеді.</p><p>USB storage ажыратпас бұрын <code>umount /mount/point</code> орындау керек.</p>`,
      ru: `<p><code>/dev/sda</code> — первый диск sd-типа, <code>/dev/sda1</code> — его первый раздел, <code>/dev/sda2</code> — второй. <code>fdisk -l</code> показывает таблицы разделов.</p><p>Перед отключением USB-накопителя выполните <code>umount /mount/point</code>.</p>`,
      en: `<p><code>/dev/sda</code> is the first sd-type disk, <code>/dev/sda1</code> its first partition, and <code>/dev/sda2</code> its second. <code>fdisk -l</code> lists partition tables.</p><p>Run <code>umount /mount/point</code> before removing USB storage.</p>`
    }
  },
  {
    id: "modules", topic: "modules",
    title: { kk: "Kernel module-дер", ru: "Модули ядра", en: "Kernel modules" },
    body: {
      kk: `<p>Kernel module ядроға функционалдық қосады. <code>lsmod</code> жүктелген module-дерді, <code>modinfo name</code> module туралы деректі көрсетеді. <code>modprobe name</code> module мен оның тәуелділіктерін жүктейді.</p><pre>lsmod\nmodinfo usb_storage\nmodprobe -n -v usb_storage</pre>`,
      ru: `<p>Модуль добавляет ядру функциональность. <code>lsmod</code> показывает загруженные модули, <code>modinfo name</code> — сведения о модуле. <code>modprobe name</code> загружает модуль и зависимости.</p><pre>lsmod\nmodinfo usb_storage\nmodprobe -n -v usb_storage</pre>`,
      en: `<p>A kernel module extends kernel functionality. <code>lsmod</code> lists loaded modules, <code>modinfo name</code> describes one, and <code>modprobe name</code> loads it with dependencies.</p><pre>lsmod\nmodinfo usb_storage\nmodprobe -n -v usb_storage</pre>`
    }
  },
  {
    id: "inspection", topic: "inspection",
    title: { kk: "Жүйені тексеру командалары", ru: "Команды проверки системы", en: "System inspection commands" },
    body: {
      kk: `<p>Емтиханда команданы оның нәтижесімен жылдам сәйкестендіру керек.</p><pre>arch       # қысқа architecture\nlscpu      # толық CPU мәліметі\nfree -m    # RAM және swap\nlsusb      # USB\nlspci -k   # PCI + driver/module\nlsmod      # жүктелген module-дер\nfdisk -l   # бөлім кестелері</pre>`,
      ru: `<p>На экзамене нужно быстро связывать команду с её результатом.</p><pre>arch       # краткая архитектура\nlscpu      # подробности CPU\nfree -m    # RAM и swap\nlsusb      # USB\nlspci -k   # PCI + driver/module\nlsmod      # загруженные модули\nfdisk -l   # таблицы разделов</pre>`,
      en: `<p>For the exam, connect each command with the information it produces.</p><pre>arch       # short architecture\nlscpu      # detailed CPU data\nfree -m    # RAM and swap\nlsusb      # USB\nlspci -k   # PCI + driver/module\nlsmod      # loaded modules\nfdisk -l   # partition tables</pre>`
    }
  }
];

export const SOURCES = [
  { label: "LPI Linux Essentials objectives", url: "https://www.lpi.org/our-certifications/exam-010-objectives/" },
  { label: "GNU Bash Reference Manual", url: "https://www.gnu.org/software/bash/manual/" },
  { label: "lscpu(1) manual", url: "https://man7.org/linux/man-pages/man1/lscpu.1.html" },
  { label: "fdisk(8) manual", url: "https://man7.org/linux/man-pages/man8/fdisk.8.html" },
  { label: "lsmod(8) manual", url: "https://man7.org/linux/man-pages/man8/lsmod.8.html" },
  { label: "modprobe(8) manual", url: "https://man7.org/linux/man-pages/man8/modprobe.8.html" },
  { label: "Linux allocated devices", url: "https://cdn.kernel.org/doc/html/latest/admin-guide/devices.html" },
  { label: "GNU Coreutils: chmod", url: "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html" }
];
