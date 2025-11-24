import app from '@/myApp'
import { Field, ErrorMessage, Form } from "vee-validate";
import InputText from "@/components/Shared/Input/Text/index.vue"
import InputSelect from "@/components/Shared/Input/Select/index.vue"
import InputSelectField from "@/components/Shared/Input/Select/Field/index.vue"
import InputEditor from "@/components/Shared/Input/Editor/index.vue"
import InputPassword from "@/components/Shared/Input/Password/index.vue"
import InputTextarea from "@/components/Shared/Input/Textarea/index.vue"
import InputPhone from "@/components/Shared/Input/Phone/index.vue"
import InputAutoComplete from "@/components/Shared/Input/AutoComplete/index.vue"
import InputRadio from "@/components/Shared/Input/Radio/index.vue"
import Button from "@/components/Shared/Button/index.vue"
import OutlinedButton from "@/components/Shared/OutlinedButton/index.vue"
import Destroy from "@/components/Shared/Destroy/index.vue"
import CustomDestroy from "@/components/CustomDestroy/index.vue"
import GenericDialog from "@/components/Shared/GenericDialog/index.vue"
import Pagination from "@/components/Shared/Pagination/index.vue"
import Image from "@/components/Shared/Image/index.vue"
import CustomChip from "@/components/Shared/CustomChip/index.vue"
import Table from "@/components/Shared/Table/index.vue"
import LocaleSelector from "@/components/Shared/LocaleSelector/index.vue"
import InputToggle from "@/components/Shared/Input/Toggle/index.vue"
import InputDate from "@/components/Shared/Input/Date/index.vue"
import InputTime from "@/components/Shared/Input/Time/index.vue"
import InputFile from "@/components/Shared/Input/File/index.vue"
import LoaderProgress from "@/components/Shared/LoaderProgress/index.vue"
import Loading from "@/components/Shared/Loading/index.vue"
import HeadingPage from "@/components/Shared/HeadingPage/index.vue"
import ReleaseVersion from "@/components/Shared/ReleaseVersion/index.vue"
import IntroSection from "@/components/IntroSection/index.vue"
import CardWrapper from "@/components/CardWrapper/index.vue"
import FilterComponent from "@/components/Shared/FilterComponent/index.vue"
import Filter from "@/components/Shared/Filter/index.vue"
import FilterChecklist from "@/components/Shared/FilterChecklist/index.vue"
import PopupToggle from '@/components/PopupToggle/index.vue';
import LabelToggle from '@/components/LabelToggle/index.vue';
import Breadcrumbs from "@/components/Shared/Breadcrumbs/index.vue"
import FilterCheckbox from "@/components/Shared/Filter/Checkbox/index.vue"
import MessageToggle from "@/components/Shared/MessageToggle/index.vue"

import PermissionGroup from '@/components/PermissionGroup/index.vue';
app.component("FilterCheckbox", FilterCheckbox)
app.component("Filter", Filter)
app.component("CardWrapper", CardWrapper)
app.component("IntroSection", IntroSection)
app.component("ReleaseVersion", ReleaseVersion)
app.component("Loading", Loading)
app.component("LoaderProgress", LoaderProgress)
app.component("Table", Table)
app.component("Image", Image)
app.component("CustomChip", CustomChip)
app.component("Field", Field)
app.component("Form", Form)
app.component("InputText", InputText)
app.component("InputPhone", InputPhone)
app.component("InputSelect", InputSelect)
app.component("InputSelectField", InputSelectField)
app.component("InputPassword", InputPassword)
app.component("InputTextarea", InputTextarea)
app.component("InputAutoComplete", InputAutoComplete)
app.component("InputRadio", InputRadio)
app.component("InputEditor", InputEditor)
app.component("InputDate", InputDate)
app.component("InputTime", InputTime)
app.component("InputToggle", InputToggle)
app.component("InputFile", InputFile)
app.component("ErrorMessage", ErrorMessage)
app.component("Button", Button)
app.component("OutlinedButton", OutlinedButton)
app.component("Destroy", Destroy)
app.component("CustomDestroy", CustomDestroy)
app.component("GenericDialog", GenericDialog)
app.component("Pagination", Pagination)
app.component("LocaleSelector", LocaleSelector)
app.component("HeadingPage", HeadingPage)
app.component("FilterComponent", FilterComponent)
app.component("FilterChecklist", FilterChecklist)
app.component("PopupToggle", PopupToggle)
app.component("LabelToggle", LabelToggle)
app.component("Breadcrumbs", Breadcrumbs)
app.component("PermissionGroup", PermissionGroup)
app.component("MessageToggle", MessageToggle)
