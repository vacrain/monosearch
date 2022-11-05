<script setup lang="ts">
  import fetchJsonp from 'fetch-jsonp'

  const engineList = [
    {
      name: 'baidu',
      showName: '百度',
      formUrl: 'https://www.baidu.com/s',
      keyword: 'wd',
      hotwordUrl: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
      hotwordKeys: ['wd', 'bs'],
      resIndex: ['g', 'q'],
      params: {
        sugmode: 2,
        json: 1,
        p: 3,
        sid: '1442_19033_21106_22075',
        req: 2,
        csor: 3,
        _: 1515232785712
      },
      param2: {
        dataType: 'jsonp',
        jsonp: 'cb',
        jsonpCallback: 'success'
      }
    },
    {
      name: 'google',
      showName: 'Google',
      formUrl: 'https://www.google.com.hk/search',
      keyword: 'q',
      hotwordUrl: 'https://www.google.com.hk/complete/search?',
      hotwordKeys: ['q'],
      resIndex: [1, 0],
      params: {
        client: 'psy-ab',
        hl: 'zh-CN',
        gs_rn: 64,
        gs_ri: 'psy-ab',
        pq: 'sdsd',
        cp: 3,
        gs_id: '1jm',
        xhr: 't'
      },
      param2: {
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'success'
      }
    }
  ]

  let oldHotword = ''
  let options = $ref([
    {
      label: '滨海湾金沙，新加坡111',
      key: 'marina bay sands',
      disabled: true
    },
    {
      label: '滨海湾金沙，新加坡222',
      key: 'marina bay sands',
      disabled: true
    },
    {
      label: '滨海湾金沙，新加坡333',
      key: 'marina bay sands',
      disabled: true
    }
  ])
  let currentHotword = $ref('')
  let showDropdown = $ref(false)
  // 可选默认: baidu google
  let defaultEngineName: String = 'google'
  let currentEngineName = defaultEngineName

  // 显示相关热词
  const handleRelateHotword = async () => {
    if (!currentHotword.trim()) {
      showDropdown = false
      return
    }
    msg('当前热词: ' + currentHotword)

    // 判断热词是否改变
    if (oldHotword == currentHotword) {
      return
    }
    oldHotword = currentHotword

    // 得到相关热词
    const resjson = await getRelateHotword()
    const relateHotwordList = resjson[1]
    console.log('relateHotwordList', relateHotwordList)

    // 显示相关热词
    options = []
    for (let relateHotword of relateHotwordList) {
      const hotwordObj = {
        label: relateHotword[0],
        key: 'marina bay sands',
        disabled: true
      }
      options.push(hotwordObj)
    }
    showDropdown = true
  }

  // 选中特定推荐搜索内容
  const handleSelect = (key: string | number) => {
    window.$message.info(String(key))
  }

  const getRelateHotword = async () => {
    let paramStr = ''
    let currentEngine = getCurrentEngine()

    for (let hotwordKey of currentEngine!.hotwordKeys) {
      paramStr += hotwordKey + '=' + currentHotword + '&'
    }

    for (let paramKey in currentEngine!.params) {
      paramStr += paramKey + '=' + currentEngine!.params[paramKey] + '&'
    }

    paramStr = 'callback=success&' + paramStr.substring(0, paramStr.length - 1)

    const fetchUrl = currentEngine!.hotwordUrl + paramStr

    // let resJson = null

    return fetchJsonp(fetchUrl)
      .then(response => {
        return response.json()
      })
      .then(json => {
        // console.log('parsed json', json)
        return json
      })
      .catch(ex => {
        // console.log('parsing failed', ex)
      })
  }

  // 得到当前搜索引擎信息
  const getCurrentEngine = () => {
    for (let i = 0; i < engineList.length; i++) {
      if (engineList[i].name == currentEngineName) return engineList[i]
    }
  }

  // 测试消息提醒功能
  const msg = (str: string) => {
    window.$message.success(str)
  }
</script>

<template>
  <div v-for="(engineItem, idx) in engineList" :key="idx">
    <n-button @click="msg(engineItem.name)">{{ engineItem.name }}</n-button>
  </div>

  <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
    <n-input
      v-model:value="currentHotword"
      @input="handleRelateHotword"
      clearable
      type="text"
      placeholder="请输入要搜索的内容"
    />
  </n-dropdown>
</template>

<style scoped></style>
