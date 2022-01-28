<template>
  <component :is="icon + '-icon'" />
</template>

<script>
import {
  DatabaseIcon,
  ExclamationCircleIcon,
  CheckIcon,
  InformationCircleIcon,
  MenuIcon,
  UserCircleIcon,
  LoginIcon,
  PlusSmIcon,
  MinusSmIcon,
  ShoppingBagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
  UsersIcon,
  LogoutIcon,
  DotsVerticalIcon,
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
  TrashIcon,
  XCircleIcon,
  FilterIcon,
  CollectionIcon,
  CogIcon,
} from "@heroicons/vue/outline";
import {
  XIcon,
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronDoubleDownIcon,
  PencilAltIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/vue/solid";

export default {
  name: "AppIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  components: {
    DatabaseIcon,
    ExclamationCircleIcon,
    CheckIcon,
    InformationCircleIcon,
    MenuIcon,
    XIcon,
    UserCircleIcon,
    LoginIcon,
    PlusSmIcon,
    MinusSmIcon,
    ShoppingBagIcon,
    HomeIcon,
    InboxIcon,
    UserIcon,
    UsersIcon,
    LogoutIcon,
    DotsVerticalIcon,
    ChevronDownIcon,
    ArrowNarrowRightIcon,
    ArrowNarrowLeftIcon,
    TrashIcon,
    XCircleIcon,
    FilterIcon,
    CollectionIcon,
    ChevronDoubleUpIcon,
    ChevronUpIcon,
    ChevronDoubleDownIcon,
    CogIcon,
    PencilAltIcon,
    EyeIcon,
    EyeOffIcon,
  },
};
</script>
