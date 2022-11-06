export const engineList = [
  {
    name: 'baidu',
    showName: '百度',
    formUrl: 'https://www.baidu.com/s?',
    keyword: 'wd',
    hotwordUrl: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
    hotwordKeys: ['wd', 'bs'],
    resIndex: ['g', 'q'],
    params: [
      'sugmode=2',
      'json=1',
      'p=3',
      'sid=1442_19033_21106_22075',
      'req=2',
      'csor=3',
      '_=1515232785712'
    ]
  },
  {
    name: 'google',
    showName: 'Google',
    formUrl: 'https://www.google.com.hk/search?',
    keyword: 'q',
    hotwordUrl: 'https://www.google.com.hk/complete/search?',
    hotwordKeys: ['q'],
    resIndex: [1, 0],
    params: [
      'client=psy-ab',
      'hl=zh-CN',
      'gs_rn=64',
      'gs_ri=psy-ab',
      'pq=sdsd',
      'cp=3',
      'gs_id=1jm',
      'xhr=t'
    ]
  }
]
