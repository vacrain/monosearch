<script setup lang="ts">
  import fetchJsonp from 'fetch-jsonp'
  import { engineList } from '../data/data'

  // 引擎
  // 可选默认: baidu google
  let defaultEngineName: String = 'google'
  let currentEngineName = defaultEngineName

  // 热词
  let currentHotword = $ref('')
  let oldHotword = ''

  // 下拉框
  let showDropdown = $ref(false)
  let options = $ref([
    {
      label: '',
      key: ''
    }
  ])

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

  // 加粗搜索词
  const boldValue = (str: string, val: string) => {
    let arr = str.split(val)
    let str1 = ''
    for (let i = 0; i < arr.length; i++) {
      str1 += arr[i] + (i === arr.length - 1 ? '' : '<b>' + val + '</b>')
    }
    return str1
  }

  const getRelateHotword = async () => {
    let paramStr = ''
    let currentEngine = getCurrentEngine()

    for (let hotwordKey of currentEngine!.hotwordKeys) {
      paramStr += hotwordKey + '=' + currentHotword + '&'
    }

    for (let param of currentEngine!.params) {
      paramStr += param + '&'
    }

    paramStr = 'callback=success&' + paramStr.substring(0, paramStr.length - 1)

    const fetchUrl = currentEngine!.hotwordUrl + paramStr

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

  /////////////////////////////////////////////////////////////////////////////////

  // 主要功能

  // 显示相关热词列表
  const handleRelateHotword = async () => {
    if (!currentHotword.trim()) {
      showDropdown = false
      return
    }

    // 判断热词是否改变
    if (oldHotword == currentHotword) {
      return
    }
    oldHotword = currentHotword

    // 得到相关热词
    const resjson = await getRelateHotword()
    const relateHotwordList = resjson[1]

    // 显示相关热词
    options = []
    for (const idx of relateHotwordList.keys()) {
      const hotwordObj = {
        label: relateHotwordList[idx][0],
        key: relateHotwordList[idx][0]
      }
      options.push(hotwordObj)
    }

    // 显示列表
    showDropdown = true
  }

  // 选中特定推荐搜索内容
  const handleSelect = (key: string) => {
    // window.$message.info(String(key))

    currentHotword = key
    const currentEngine = getCurrentEngine()
    window.open(
      currentEngine?.formUrl +
        currentEngine!.hotwordKeys[0] +
        '=' +
        currentHotword
    )

    showDropdown = false
  }

  // 选择特定搜索引擎进行查询
  const selectEngine = (engineName: string) => {
    currentEngineName = engineName
    handleSelect(currentHotword)
  }

  // 设置默认引擎
  const setDefaultEngine = (engineName: string) => {
    defaultEngineName = engineName
    window.$message.info('当前默认搜索引擎: ' + defaultEngineName)
  }
</script>

<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <div v-for="(engineItem, idx) in engineList" :key="idx">
          <n-button @click="selectEngine(engineItem.name)">
            {{ engineItem.name }}
          </n-button>
          <n-button @click="setDefaultEngine(engineItem.name)">
            设为默认
          </n-button>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <n-dropdown
          :show="showDropdown"
          :options="options"
          @select="handleSelect"
        >
          <n-input
            v-model:value="currentHotword"
            @input="handleRelateHotword"
            clearable
            type="text"
            placeholder="请输入要搜索的内容"
          />
        </n-dropdown>
      </n-layout-content>
      <n-layout-footer>声明</n-layout-footer>
    </n-layout>
  </n-space>
</template>

<style scoped></style>
