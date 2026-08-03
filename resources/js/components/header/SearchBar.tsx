import { SearchIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchBar() {
  return (
    <div className="w-full rounded-lg px-4 py-2">
      <InputGroup className="">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Seach..." />
      </InputGroup>
    </div>
  );
}
