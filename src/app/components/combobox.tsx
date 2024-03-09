"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)";
import {
  Alignment,
  EdgeStyle,
  Patterns,
  setAlignment,
  setEdgeStyle,
  setPattern,
} from "../(slice)/optionsSlice";
import { updateNodeHandlePositions } from "../(slice)/nodeSlice";
import { alignment } from "../(options)";
import { Position } from "reactflow";
import { updateEdgeStyle } from "../(slice)/edgeSlice";

export function Combobox({
  list,
  disabled = false,
}: {
  list: {
    default: string;
    title: string;
    items: any[];
  };
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(list.default);
  const dispatch = useDispatch();

  const { title, items } = list;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <h3 className="font-normal">
            {value
              ? items.find((item) => item.value === value)?.label
              : `Choose ${title}`}
          </h3>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}`} />
          <CommandEmpty>No pattern found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                disabled={item.disabled}
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  if (title === "Alignment") {
                    dispatch(setAlignment(currentValue as Alignment));
                    if (currentValue === "vertical") {
                      dispatch(
                        updateNodeHandlePositions({
                          target: Position.Top,
                          source: Position.Bottom,
                        })
                      );
                    } else {
                      dispatch(
                        updateNodeHandlePositions({
                          target: Position.Left,
                          source: Position.Right,
                        })
                      );
                    }
                  }

                  title === "Patterns" &&
                    dispatch(setPattern(currentValue as Patterns));
                  if (title === "Edge Style") {
                    dispatch(setEdgeStyle(currentValue as EdgeStyle));
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
