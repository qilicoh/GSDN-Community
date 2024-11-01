import {useLocation, useNavigate,useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Layout, message} from "antd";
import ArticleDrawer from "../Drawer/ArticleDrawer";
import MarkDownEditor from "../Editor/MarkDownEditor";
import EditorHeader from "../Header/EditorHeader";
import ArticleDraftStorage from "@utils/StorageUtils/ArticleDraftStorage";

const {Content} = Layout
export default function DraftsMarkDown() {
	const {draftid} = useParams()

	const navigator = useNavigate()
	const location = useLocation()
	const [visible,setVisible] = useState(false)
	const [title,setTitle] = useState('')

	const [text,setText] = useState('')

	useEffect(() => {
		// @ts-ignore
		if (!draftid || !location?.state?.Versions){
			message.warn('未找到草稿信息')
			navigator('/user/drafts')
		}else{
			// @ts-ignore
			let {Versions:{title,content}} = location.state
			setTitle(title)
			setText(content)
			ArticleDraftStorage.saveArticleDraftID(draftid)
		}
	},[])

	useEffect(() => {
		ArticleDraftStorage.updateArticleDraft(title,text,'markdown')
	},[title,text])

	const openDrawer = () =>{
		setVisible(true)
	}
	const closeDrawer = () => {
		setVisible(false)
	}
	const handleTitleChange = ({target}:any) => {
		setTitle(target.value)
	}
	return(
		<div className='Editor_Container'>
			<Layout>
				<EditorHeader
					handleTitleChange={handleTitleChange}
					openDrawer={openDrawer}
					title={title}
					isEdit={false}
				/>
				<Content>
					<div className="editor-site-layout-content" >
						<ArticleDrawer
							visible={visible}
							onClose={closeDrawer}
							title={title}
							markdown={text}
							isMarkdown={true}
						/>
						<MarkDownEditor text={text} setText={setText}/>
					</div>
				</Content>
			</Layout>
		</div>

	)
}
