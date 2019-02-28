const {
    Builder,
    By,
    Key,
    until,
    Cookie
} = require('selenium-webdriver');

const driver = new Builder()
    .forBrowser('firefox')
    // .setChromeOptions(new Options().excludeSwitches(["ignore-certificate-errors", 'user-data-dir="C:\\Users\\qiang\\AppData\\Local\\Google\\Chrome\\User Data"']))
    .build();

simulateLogin = () => {
    driver.get('https://web.wps.cn/office/p/110009801-110184691')
        .then(function () {
            driver.manage().window().maximize();
        }).catch(function (e) {
            console.log(e);
        });

    driver.findElement(By.id('qq')).click();

    driver.sleep(12 * 1000).then(function () {
        driver.switchTo().frame(driver.findElement(By.xpath("//*[@id='ptlogin_iframe']"))).then(function () {
            driver.findElement(By.id('switcher_plogin')).click();
        })
    }).catch(function (e) {
        console.log(e);
    });

    driver.sleep(15 * 1000).then(function () {
        driver.findElement(By.id('u')).sendKeys(447887933);
        driver.findElement(By.id('p')).sendKeys('wwf960417');
        driver.findElement(By.id('login_button')).click();
    }).catch(function (e) {
        console.log(e);
    });

    driver.sleep(18 * 1000).then(function () {
        driver.manage().addCookie({
            name: 'weboffice_branch',
            value: 'func_ppt_preformance_log'
        });
    }).catch(function (e) {
        console.log(e);
    });

    driver.sleep(20 * 1000).then(function () {
        driver.navigate().refresh();
    }).catch(function (e) {
        console.log(e);
    });

    //上面的全部都是模拟登陆

    driver.sleep(25 * 1000).then(function () {
        let el = driver.findElement(By.className('scrollbar_thumb'));
        let actions = driver.actions();
        driver.sleep(50).then(function () {
            driver.executeScript(`window.renderPerformance.countBefore()`);
            driver.sleep(50).then(function () {
                actions.move({ origin: el }).press();
                actions.move({ x: 0, y: 900, duration: 7000 });
                actions.release();
                actions.perform();
                driver.sleep(50).then(function () {
                    driver.executeScript(`window.renderPerformance.countAfter();window.renderPerformance.toCsv(renderPerformance._data)`);
                })
            })
        })
    })
}

simulateLogin();
