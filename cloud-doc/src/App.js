import React, { useState } from 'react'
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from 'react-simplemde-editor'
import { v4 as uuidv4 } from 'uuid';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from './utils/fileHelper'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "easymde/dist/easymde.min.css"

// require node.js modules
const { join } = window.require('path')
const { remote } = window.require('electron')

// const Store = window.require('electron-store')
// debugger
// console.log(Store)
// const store = new Store()
// store.set('name', 'kcs')
// console.log(store.get('name'))


function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([]) 

  const activeFile = files[activeFileID]
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const filesArr = objToArr(files)
  const savedLocation = remote.app.getPath('documents')
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr

  const fileClick = (fileID) => {
    // set current active file
    setActiveFileID(fileID)
    // if openedFiles don't have the current ID
    // then add new fileID to openedFiles
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }
  const tabClick = (fileID) => {
    // set current active file
    setActiveFileID(fileID)
  }
  const tabClose = (id) => {
    // remove current id from openedFileIDs
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabWithout)
    // set the active to the first opened tab if still tabs left
    if (tabWithout.length > 0) {
      setActiveFileID(tabWithout[0])
    } else {
      setActiveFileID('')
    }
  }
  const fileChange = (id, value) => {
    const newFile = {...files[id], body: value}
    setFiles({...files, [id]: newFile})
    // update unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }
  const deleteFile = (id) => {
    // filter out the current file id
    delete files[id]
    setFiles(files)
    // close the tab if opened
    tabClose(id)
  }
  const updateFileName = (id, title, isNew) => {
    const modifiedFile = {...files[id], title, isNew: false}
    if (isNew) {
      fileHelper.writeFile(join(savedLocation, `${title}.md`), files[id].body).then((err) => {
        setFiles({...files, [id]: modifiedFile})
      })
    } else {
      fileHelper.renameFile(join(savedLocation, `${files[id].title}.md`), 
      join(savedLocation, `${title}.md`)).then(() => {
        setFiles({...files, [id]: modifiedFile})
      })
    }
    
  }
  const fileSearch = (keyword) => {
    // filter out the new files based on the keyword
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  const createNewFile = () => {
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输入 Markdown',
      createdAt: new Date().getTime(),
      isNew: true
    }
    setFiles({...files, [newID]: newFile})
  }
  const saveCurrentFile = () => {
    fileHelper.writeFile(join(savedLocation, `${activeFile.title}.md`),
      activeFile.body).then(() => {
        setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id))
      })
  }
  const test = () => {
    const Store = window.require("electron-store")
    debugger
    const store = new Store({ watch: true })
    debugger
  }

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            onFileSearch={fileSearch}
          />
          <FileList 
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn 
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn 
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {
            !activeFile &&
            <div className="start-page">选择或者创建新的 Markdown 文档</div>
          }
          {
            activeFile &&
            <>
              <TabList 
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE 
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {fileChange(activeFile.id, value)}}
                options={{
                  minHeight: '515px'
                }}
              />
              <BottomBtn 
                text="导入"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={saveCurrentFile}
              />
              <BottomBtn 
                text="测试"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={test}
              />
            </>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
