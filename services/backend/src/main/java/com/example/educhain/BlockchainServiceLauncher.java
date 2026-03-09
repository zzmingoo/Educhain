package com.example.educhain;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.Scanner;

/**
 * 区块链服务启动器
 *
 * <p>在 IntelliJ IDEA 中直接运行此类的 main 方法即可启动区块链服务
 *
 * <p>功能特性： - 自动检测 Anaconda 环境 - 自动创建虚拟环境（可选） - 自动安装依赖 - 使用虚拟环境启动服务
 *
 * <p>使用方法： 1. 右键点击此类 -> Run 'BlockchainServiceLauncher.main()' 2. 或点击类名左侧的绿色运行按钮
 */
public class BlockchainServiceLauncher {

  private static final String CONDA_ENV_NAME = "educhain";
  private static final String PYTHON_VERSION = "3.11";

  public static void main(String[] args) {
    System.out.println("========================================");
    System.out.println("   EduChain 区块链服务启动器");
    System.out.println("========================================");
    System.out.println();

    try {
      // 获取项目根目录
      String projectRoot = getProjectRoot();
      String blockchainServicePath = Paths.get(projectRoot, "blockchain-service").toString();
      String mainPyPath = Paths.get(blockchainServicePath, "main.py").toString();

      // 检查文件是否存在
      File mainPyFile = new File(mainPyPath);
      if (!mainPyFile.exists()) {
        System.err.println("错误: 区块链服务文件不存在: " + mainPyPath);
        System.err.println("请确保 services/blockchain/main.py 文件存在");
        System.exit(1);
      }

      File requirementsFile = new File(blockchainServicePath, "requirements.txt");
      if (!requirementsFile.exists()) {
        System.err.println("警告: requirements.txt 文件不存在");
      }

      System.out.println("项目根目录: " + projectRoot);
      System.out.println("区块链服务目录: " + blockchainServicePath);
      System.out.println();

      // 检测并准备 Anaconda 环境
      String condaEnv = detectAndPrepareCondaEnvironment();

      if (condaEnv == null) {
        System.err.println("无法使用 Anaconda 环境，将尝试使用系统 Python");
        System.out.println();
      } else {
        System.out.println("使用 Anaconda 环境: " + condaEnv);
        System.out.println();
      }

      // 检查并安装依赖（仅在需要时）
      if (condaEnv != null && requirementsFile.exists()) {
        boolean installSuccess = installDependencies(blockchainServicePath, condaEnv);
        if (!installSuccess) {
          System.err.println();
          System.err.println("⚠️  依赖安装失败，但将继续尝试启动服务");
          System.err.println("如果启动失败，请手动执行以下命令：");
          System.err.println("  conda activate " + condaEnv);
          System.err.println("  cd blockchain-service");
          System.err.println("  pip install -r requirements.txt");
          System.err.println();
        }
      }

      System.out.println("正在启动区块链服务...");
      System.out.println();

      // 构建启动命令
      ProcessBuilder processBuilder = buildStartCommand(condaEnv, blockchainServicePath);
      processBuilder.directory(new File(blockchainServicePath));
      processBuilder.redirectErrorStream(true);

      // 启动进程
      Process process = processBuilder.start();

      // 启动日志输出线程
      Thread logThread = startLogThread(process);
      logThread.start();

      // 添加关闭钩子
      addShutdownHook(process);

      // 获取并显示依赖安装目录
      String installDir = getDependencyInstallDir(condaEnv);

      System.out.println("========================================");
      System.out.println("区块链服务启动成功！");
      System.out.println("服务地址: http://localhost:8000");
      System.out.println("API文档: http://localhost:8000/docs");
      System.out.println("健康检查: http://localhost:8000/health");
      if (installDir != null && !installDir.isEmpty()) {
        System.out.println("依赖安装目录: " + installDir);
      }
      System.out.println("========================================");
      System.out.println("按 Ctrl+C 停止服务");
      System.out.println();

      // 等待进程结束
      int exitCode = process.waitFor();
      handleExit(exitCode, condaEnv);

    } catch (Exception e) {
      System.err.println("启动区块链服务失败: " + e.getMessage());
      e.printStackTrace();
      System.exit(1);
    }
  }

  /** 检测并准备 Anaconda 环境 */
  private static String detectAndPrepareCondaEnvironment() {
    // 检查是否已有激活的 conda 环境
    String activeEnv = System.getenv("CONDA_DEFAULT_ENV");
    if (activeEnv != null && !activeEnv.isEmpty()) {
      System.out.println("检测到已激活的 Anaconda 环境: " + activeEnv);
      return activeEnv;
    }

    // 检查 conda 命令是否可用
    if (!isCommandAvailable("conda")) {
      System.out.println("未检测到 conda 命令，将使用系统 Python");
      return null;
    }

    // 检查目标环境是否存在
    if (isCondaEnvExists(CONDA_ENV_NAME)) {
      System.out.println("检测到 Anaconda 环境: " + CONDA_ENV_NAME);
      return CONDA_ENV_NAME;
    }

    // 询问是否创建新环境
    System.out.println("未找到 Anaconda 虚拟环境: " + CONDA_ENV_NAME);
    System.out.println("是否自动创建虚拟环境并安装依赖？(y/n，默认: y)");

    Scanner scanner = new Scanner(System.in);
    String answer = scanner.nextLine().trim().toLowerCase();

    if (answer.isEmpty() || answer.equals("y") || answer.equals("yes")) {
      System.out.println("正在创建 Anaconda 虚拟环境...");
      if (createCondaEnvironment()) {
        System.out.println("虚拟环境创建成功！");
        return CONDA_ENV_NAME;
      } else {
        System.err.println("虚拟环境创建失败");
        return null;
      }
    } else {
      System.out.println("跳过创建虚拟环境，将使用系统 Python");
      return null;
    }
  }

  /** 检查命令是否可用 */
  private static boolean isCommandAvailable(String command) {
    try {
      ProcessBuilder pb = new ProcessBuilder(command, "--version");
      pb.redirectErrorStream(true);
      Process process = pb.start();
      int exitCode = process.waitFor();
      return exitCode == 0;
    } catch (Exception e) {
      return false;
    }
  }

  /** 检查 conda 环境是否存在 */
  private static boolean isCondaEnvExists(String envName) {
    try {
      ProcessBuilder pb = new ProcessBuilder("conda", "env", "list");
      pb.redirectErrorStream(true);
      Process process = pb.start();

      try (BufferedReader reader =
          new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
        String line;
        while ((line = reader.readLine()) != null) {
          if (line.contains(envName)) {
            return true;
          }
        }
      }

      process.waitFor();
      return false;
    } catch (Exception e) {
      return false;
    }
  }

  /** 创建 conda 虚拟环境 */
  private static boolean createCondaEnvironment() {
    try {
      System.out.println("正在创建环境: " + CONDA_ENV_NAME + " (Python " + PYTHON_VERSION + ")");

      ProcessBuilder pb =
          new ProcessBuilder(
              "conda", "create", "-n", CONDA_ENV_NAME, "python=" + PYTHON_VERSION, "-y");
      pb.redirectErrorStream(true);
      Process process = pb.start();

      // 输出创建日志
      try (BufferedReader reader =
          new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
        String line;
        while ((line = reader.readLine()) != null) {
          System.out.println("[Conda] " + line);
        }
      }

      int exitCode = process.waitFor();
      return exitCode == 0;
    } catch (Exception e) {
      System.err.println("创建 conda 环境失败: " + e.getMessage());
      return false;
    }
  }

  /** 检查依赖是否已安装（更严格的检查） */
  private static boolean checkDependenciesInstalled(String condaEnv) {
    try {
      // 检查所有关键依赖包是否已安装
      ProcessBuilder pb =
          new ProcessBuilder(
              "conda",
              "run",
              "-n",
              condaEnv,
              "--no-capture-output",
              "python",
              "-c",
              "import sys\n"
                  + "missing = []\n"
                  + "try:\n"
                  + "    import fastapi\n"
                  + "except ImportError:\n"
                  + "    missing.append('fastapi')\n"
                  + "try:\n"
                  + "    import uvicorn\n"
                  + "except ImportError:\n"
                  + "    missing.append('uvicorn')\n"
                  + "try:\n"
                  + "    import pydantic\n"
                  + "except ImportError:\n"
                  + "    missing.append('pydantic')\n"
                  + "try:\n"
                  + "    import sqlalchemy\n"
                  + "except ImportError:\n"
                  + "    missing.append('sqlalchemy')\n"
                  + "try:\n"
                  + "    import reportlab\n"
                  + "except ImportError:\n"
                  + "    missing.append('reportlab')\n"
                  + "try:\n"
                  + "    import qrcode\n"
                  + "except ImportError:\n"
                  + "    missing.append('qrcode')\n"
                  + "try:\n"
                  + "    from PIL import Image\n"
                  + "except ImportError:\n"
                  + "    missing.append('Pillow')\n"
                  + "if missing:\n"
                  + "    print('MISSING:', ','.join(missing))\n"
                  + "    sys.exit(1)\n"
                  + "else:\n"
                  + "    print('OK')\n"
                  + "    sys.exit(0)\n");
      pb.redirectErrorStream(true);
      Process process = pb.start();

      boolean foundOk = false;
      boolean foundMissing = false;
      try (BufferedReader reader =
          new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
        String line;
        while ((line = reader.readLine()) != null) {
          if (line.contains("OK")) {
            foundOk = true;
          }
          if (line.contains("MISSING:")) {
            System.out.println("[Check] " + line);
            foundMissing = true;
          }
        }
      }

      int exitCode = process.waitFor();
      // 必须同时满足：退出码为0 且 找到OK 且 没有缺失
      return exitCode == 0 && foundOk && !foundMissing;
    } catch (Exception e) {
      System.out.println("[Check] 检查依赖时出错: " + e.getMessage());
      return false;
    }
  }

  /** 安装依赖（仅在需要时安装） */
  private static boolean installDependencies(String blockchainServicePath, String condaEnv) {
    try {
      // 先检查依赖是否已安装
      System.out.println("检查依赖是否已安装...");
      boolean dependenciesInstalled = checkDependenciesInstalled(condaEnv);

      if (dependenciesInstalled) {
        System.out.println("✓ 依赖已安装，跳过安装步骤");
        return true;
      }

      System.out.println("✗ 检测到依赖缺失，开始安装...");

      // 输出依赖安装目录
      String installDir = getDependencyInstallDir(condaEnv);
      if (installDir != null && !installDir.isEmpty()) {
        System.out.println("📦 依赖安装目录: " + installDir);
      }

      System.out.println("这可能需要几分钟时间，请耐心等待...");
      System.out.println();

      ProcessBuilder pb =
          new ProcessBuilder(
              "conda",
              "run",
              "-n",
              condaEnv,
              "--no-capture-output",
              "pip",
              "install",
              "-r",
              "requirements.txt");
      pb.directory(new File(blockchainServicePath));
      pb.redirectErrorStream(true);

      Process process = pb.start();

      // 输出安装日志
      try (BufferedReader reader =
          new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
        String line;
        while ((line = reader.readLine()) != null) {
          System.out.println("[Install] " + line);
        }
      }

      int exitCode = process.waitFor();
      if (exitCode == 0) {
        System.out.println("依赖安装成功！");
        return true;
      } else {
        System.err.println("依赖安装失败，退出码: " + exitCode);
        return false;
      }
    } catch (Exception e) {
      System.err.println("安装依赖失败: " + e.getMessage());
      return false;
    }
  }

  /** 构建启动命令 */
  private static ProcessBuilder buildStartCommand(String condaEnv, String blockchainServicePath) {
    if (condaEnv != null) {
      // 使用 conda run 启动
      return new ProcessBuilder(
          "conda", "run", "-n", condaEnv, "--no-capture-output", "python", "main.py");
    } else {
      // 使用系统 Python
      String pythonCmd = detectSystemPython();
      return new ProcessBuilder(pythonCmd, "main.py");
    }
  }

  /** 检测系统 Python 命令 */
  private static String detectSystemPython() {
    String os = System.getProperty("os.name").toLowerCase();
    return os.contains("win") ? "python" : "python3";
  }

  /** 启动日志输出线程 */
  private static Thread startLogThread(Process process) {
    Thread logThread =
        new Thread(
            () -> {
              try (BufferedReader reader =
                  new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) {
                  System.out.println("[Blockchain] " + line);

                  // 检测到模块缺失错误时给出提示
                  if (line.contains("ModuleNotFoundError")) {
                    printDependencyError();
                  }
                }
              } catch (Exception e) {
                System.err.println("读取日志失败: " + e.getMessage());
              }
            });
    logThread.setDaemon(true);
    return logThread;
  }

  /** 打印依赖错误提示 */
  private static void printDependencyError() {
    System.err.println();
    System.err.println("========================================");
    System.err.println("检测到依赖缺失错误！");
    System.err.println();
    System.err.println("请执行以下命令安装依赖：");
    System.err.println();

    String condaEnv = System.getenv("CONDA_DEFAULT_ENV");
    if (condaEnv != null && !condaEnv.isEmpty()) {
      System.err.println("  conda activate " + condaEnv);
      System.err.println("  cd blockchain-service");
      System.err.println("  pip install -r requirements.txt");
      System.err.println();
      System.err.println("或使用 conda run：");
      System.err.println("  conda run -n " + condaEnv + " pip install -r requirements.txt");
    } else {
      System.err.println("  cd blockchain-service");
      System.err.println("  pip install -r requirements.txt");
      System.err.println();
      System.err.println("或使用 Anaconda 虚拟环境：");
      System.err.println("  conda create -n educhain python=3.11");
      System.err.println("  conda activate educhain");
      System.err.println("  cd blockchain-service");
      System.err.println("  pip install -r requirements.txt");
    }
    System.err.println("========================================");
    System.err.println();
  }

  /** 添加关闭钩子 */
  private static void addShutdownHook(Process process) {
    Runtime.getRuntime()
        .addShutdownHook(
            new Thread(
                () -> {
                  System.out.println("\n正在关闭区块链服务...");
                  if (process != null && process.isAlive()) {
                    process.destroy();
                    try {
                      process.waitFor(5, java.util.concurrent.TimeUnit.SECONDS);
                      if (process.isAlive()) {
                        process.destroyForcibly();
                      }
                    } catch (InterruptedException e) {
                      process.destroyForcibly();
                    }
                  }
                }));
  }

  /** 处理退出 */
  private static void handleExit(int exitCode, String condaEnv) {
    if (exitCode != 0) {
      System.err.println("\n区块链服务异常退出，退出码: " + exitCode);
      System.err.println("请检查：");
      if (condaEnv != null) {
        System.err.println(
            "1. 是否已安装Python依赖: conda run -n " + condaEnv + " pip install -r requirements.txt");
      } else {
        System.err.println(
            "1. 是否已安装Python依赖: cd blockchain-service && pip install -r requirements.txt");
      }
      System.err.println("2. Python版本是否正确: python3 --version (需要3.11+)");
      System.err.println("3. 查看上方错误信息");
    } else {
      System.out.println("区块链服务正常退出");
    }
  }

  /** 获取依赖安装目录 */
  private static String getDependencyInstallDir(String condaEnv) {
    if (condaEnv == null) {
      return null;
    }
    try {
      ProcessBuilder pb =
          new ProcessBuilder(
              "conda",
              "run",
              "-n",
              condaEnv,
              "--no-capture-output",
              "python",
              "-c",
              "import site; print(site.getsitepackages()[0] if site.getsitepackages() else '')");
      Process process = pb.start();
      try (BufferedReader reader =
          new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
        String line;
        while ((line = reader.readLine()) != null) {
          if (!line.trim().isEmpty()) {
            process.waitFor();
            return line.trim();
          }
        }
      }
      process.waitFor();
    } catch (Exception e) {
      // 忽略错误
    }
    return null;
  }

  /** 获取项目根目录 */
  private static String getProjectRoot() {
    File currentDir = new File(System.getProperty("user.dir"));

    while (currentDir != null) {
      File blockchainDir = new File(currentDir, "blockchain-service");
      if (blockchainDir.exists() && blockchainDir.isDirectory()) {
        return currentDir.getAbsolutePath();
      }
      currentDir = currentDir.getParentFile();
    }

    return System.getProperty("user.dir");
  }
}
